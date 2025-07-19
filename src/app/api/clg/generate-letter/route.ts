import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { coverLetterPrompt } from "src/constants/prompts/cover-letter";
import { z } from "zod";

const CoverLetterSchema = z.object({
  content: z.string().describe("The raw cover letter content"),
  formatted: z.string().describe("HTML formatted version of the cover letter"),
  keyPoints: z
    .array(z.string())
    .describe("Key points highlighted in the letter"),
});

export async function POST(req: Request) {
  try {
    const { companyData, language } = await req.json();

    if (!companyData) {
      return Response.json(
        { error: "Company data is required" },
        { status: 400 },
      );
    }

    const result = await generateObject({
      model: openai("o3-mini"),
      prompt: coverLetterPrompt(companyData, language),
      schema: CoverLetterSchema,
    });

    return Response.json(result.object);
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return Response.json(
      { error: "Failed to generate cover letter" },
      { status: 500 },
    );
  }
}
