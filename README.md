# HackED 2024 - Team 3IQ

## Getting Started

First, run the development server:

```bash
pnpm i
pnpm dev
```

gcloud builds submit --tag gcr.io/hacked-2024-410423/nextjs --project hacked-2024-410423 

gcloud run deploy --image gcr.io/hacked-2024-410423/nextjs --project hacked-2024-410423 --platform managed --allow-unauthenticated