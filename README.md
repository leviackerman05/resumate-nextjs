# Resumate

AI-powered cover letter generator. Upload your resume PDF and job description, get a tailored editable cover letter, and download a high-quality single-page PDF.

## Features

- Resume PDF parsing and JD input via paste or PDF
- Groq-powered cover letter generation (Llama 3.3)
- Google sign-in with a 5 generations per day limit (no cover letters saved)
- Editable generated content
- Multiple PDF templates: Modern, Classic, Minimal ATS, Executive, Accent
- Single-page layout with density controls
- Em dash free output
- Copy as text and download `.txt` or `.pdf`

## Free hosting stack

- **Vercel** (free tier) for the Next.js app
- **Groq** (free API) for AI generation
- **Upstash Redis** (free tier) for daily rate limiting
- **Google OAuth** for sign-in

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

- `GROQ_API_KEY` from [console.groq.com](https://console.groq.com)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from [Google Cloud Console](https://console.cloud.google.com/)
- `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` (`http://localhost:3000` locally)
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from [Upstash](https://upstash.com/)

### Google OAuth setup

1. Create an OAuth 2.0 Client ID (Web application)
2. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
3. For production, also add: `https://your-domain.vercel.app/api/auth/callback/google`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in Vercel
3. Add all environment variables from `.env.example`
4. Deploy

## Notes

- Cover letters are not stored. Only a daily generation counter is kept in Redis.
- If Upstash is not configured locally, rate limiting is skipped in development.
- Generated content is sanitized to remove em dashes and en dashes.
