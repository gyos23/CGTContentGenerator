# Content Generator Studio

A Next.js app for crafting scroll-stopping content blueprints tailored to your brand voice. Drop in your business details and instantly receive:

- Campaign hooks and angles
- Shot-by-shot video plans
- Script beats aligned with your CTA
- Director notes tuned to platform and production level

Need a bigger-picture content push? Switch to the **Theme Campaign Lab** tab to input a single topic and auto-generate:

- A flagship narrative headline and north star
- Suggested campaign cadence and post-by-post plan
- Supporting shot lists for each deliverable
- Fully scripted beats you can adapt to camera or teleprompter

Designed for quick deployment to Vercel.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the generator.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Create a new Vercel project and import the repo.
3. Keep the default build settings (`npm install`, `npm run build`, `npm start`).
4. Set the framework preset to **Next.js**.

## Customize

All generator logic lives in [`lib/generateContent.ts`](lib/generateContent.ts). Tweak the heuristics, tone templates, or output structure to match your creative workflow.

Styling is managed in [`app/page.module.css`](app/page.module.css). Update colors, spacing, or layout without touching logic.
