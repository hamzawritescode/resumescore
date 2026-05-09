# ResumeScore

AI-powered resume analyzer that scores your resume against any job description.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. **Set up database:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Run locally:**
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:3000

## Deploy to Render

1. Push this repo to GitHub
2. Connect to Render (render.yaml included)
3. Render auto-deploys with PostgreSQL database

## Features

- Resume upload (PDF/text) or paste
- Job description analysis
- Keyword matching score (0-100)
- Missing keywords detection
- AI improvement suggestions
- Free tier: 3 scans/month
- Pro tier: $9/month unlimited

## Tech Stack

- Next.js 14 + React + TypeScript
- Tailwind CSS + Framer Motion
- NextAuth.js authentication
- Prisma + PostgreSQL
- Deployed on Render (free tier)
