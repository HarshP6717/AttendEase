# Deployment Guide for AttendEase

This guide will walk you through deploying the AttendEase application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)
2. Node.js (v16 or later) and npm installed locally
3. Git installed locally

## Environment Variables

Before deploying, make sure to set up the following environment variables in your Vercel project:

### Required Variables
- `VITE_API_URL` - Your API endpoint URL
- `VITE_AUTH0_DOMAIN` - Your Auth0 domain
- `VITE_AUTH0_CLIENT_ID` - Your Auth0 client ID
- `VITE_AUTH0_AUDIENCE` - Your Auth0 audience

### Optional Variables
- `VITE_API_KEY` - API key if required by your backend
- `VITE_APP_TITLE` - Application title
- `VITE_ENABLE_ANALYTICS` - Set to "true" to enable analytics
- `VITE_DEBUG_MODE` - Set to "true" to enable debug mode

## Deploying to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

### Option 2: Using GitHub Integration

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure the project settings:
   - Framework Preset: Vite
   - Root Directory: (leave empty if your project is at the root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add all the required environment variables in the "Environment Variables" section
7. Click "Deploy"

## Environment Configuration

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` with your local development settings

### Production

Set all environment variables in your Vercel project settings under:
Project Settings → Environment Variables

## Custom Domain (Optional)

To set up a custom domain:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" → "Domains"
3. Enter your domain name and follow the instructions to verify ownership
4. Update your DNS settings as instructed by Vercel

## Troubleshooting

### Build Failures

1. Check the build logs in the Vercel dashboard for specific error messages
2. Ensure all required environment variables are set
3. Make sure your `package.json` has all the required dependencies

### Runtime Issues

1. Check the browser console for errors
2. Verify that all API endpoints are correctly configured
3. Ensure CORS is properly set up on your backend

## Support

For additional help, please refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/learn)
