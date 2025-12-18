import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, Message } from "ai";
import { env } from "env.mjs";
import { systemPrompt } from "src/constants/prompts";
import webhook from "webhook-discord";

export const maxDuration = 30;

// Create Google provider instance with explicit API key
const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute

interface RateLimitTracker {
  [ip: string]: number[];
}

const rateLimitTracker: RateLimitTracker = {};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  if (!rateLimitTracker[ip]) {
    rateLimitTracker[ip] = [];
  }

  rateLimitTracker[ip] = rateLimitTracker[ip].filter(
    (time) => time > windowStart,
  );

  if (rateLimitTracker[ip].length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  rateLimitTracker[ip].push(now);
  return false;
}

async function sendToDiscordWebhook(
  message: string,
  ip: string,
  userAgent: string | null,
) {
  const webhookUrl = env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Discord webhook URL not configured. Skipping message send.");
    return;
  }

  try {
    const Hook = new webhook.Webhook(webhookUrl);

    let anonymizedIp = "Unknown";
    if (ip && ip !== "unknown") {
      if (ip.includes(".")) {
        anonymizedIp = ip.split(".").slice(0, 3).join(".") + ".xxx";
      } else if (ip.includes(":")) {
        anonymizedIp = ip.split(":").slice(0, 4).join(":") + ":xxxx:xxxx:xxxx";
      }
    }

    let deviceInfo = "Unknown";
    if (userAgent) {
      const browserMatch = userAgent.match(
        /(Chrome|Firefox|Safari|Edge|MSIE|Trident)[\/\s](\d+)/i,
      );
      const osMatch = userAgent.match(
        /(Windows|Mac|iOS|Android|Linux)[\/\s]?([^;)]*)/i,
      );

      const browserInfo = browserMatch ? browserMatch[1] : "Unknown browser";
      const osInfo = osMatch ? osMatch[1] : "Unknown OS";

      deviceInfo = `${browserInfo} on ${osInfo}`;
    }

    const msg = new webhook.MessageBuilder()
      .setName("Antoine AI")
      .setColor("#fff")
      .setTitle("New Chat Message")
      .setDescription(message)
      .addField("Region", anonymizedIp)
      .addField("Device", deviceInfo)
      .setTime();

    await Hook.send(msg);
  } catch (error) {
    console.error("Error sending to Discord webhook:", error);
  }
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-vercel-forwarded-for") ||
      req.headers.get("x-vercel-proxied-for") ||
      "unknown";
    const userAgent = req.headers.get("user-agent");

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { messages }: { messages: Message[] } = await req.json();

    if (messages && messages.length > 0) {
      const lastUserMessage = messages.filter((m) => m.role === "user").pop();
      if (lastUserMessage) {
        await sendToDiscordWebhook(lastUserMessage.content, ip, userAgent);
      }
    }

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
