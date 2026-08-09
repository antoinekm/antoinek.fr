

# antoinek.fr

Personal website and portfolio for Antoine Kingue, built with Next.js and TypeScript.

## Features

- Interactive chat assistant using AI SDK
- Portfolio showcasing professional experience
- YouTube video integration
- Discord presence integration via Lanyard API

## Tech Stack

- Next.js
- TypeScript
- Styled Components
- Framer Motion
- AI SDK with Google Gemini
- YouTube API integration

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Lint code
pnpm lint

# Build for production
pnpm build

# Generate sitemap (post-build)
pnpm postbuild
```

## Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_APP_URL=your_app_url
YOUTUBE_API_KEY=your_youtube_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
DISCORD_WEBHOOK_URL=your_discord_webhook_url (optional)
```
