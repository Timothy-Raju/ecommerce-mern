# Ecommerce Frontend (Vercel)

## Environment Variable

Create a `.env` file in this folder for local testing:

VITE_API_BASE_URL=http://localhost:3000

For Vercel, set this in Project Settings -> Environment Variables:

- Name: `VITE_API_BASE_URL`
- Value: `https://your-backend.onrender.com`

## Run Locally

1. Install dependencies:

npm install

2. Start frontend:

npm run dev

## Deploy to Vercel

1. Import this project folder (`ecommerce-project`) in Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable `VITE_API_BASE_URL` with your Render backend URL.
5. Redeploy after setting environment variables.

## Notes

- All frontend API requests use `VITE_API_BASE_URL` when it is set.
- If `VITE_API_BASE_URL` is not set, frontend falls back to relative `/api` requests (useful with local Vite proxy).
