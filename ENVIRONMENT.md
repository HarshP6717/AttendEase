# Environment Variables

This document lists all the environment variables required for the AttendEase application to run properly in different environments.

## Required Environment Variables

### Frontend (Vite)
- `VITE_API_BASE_URL` - Base URL for API requests (e.g., `https://api.attendease.com`)
- `VITE_APP_ENV` - Application environment (`development`, `staging`, `production`)
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID for authentication
- `VITE_GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret for authentication

### Backend (if applicable)
- `DATABASE_URL` - Connection string for your database
- `JWT_SECRET` - Secret key for JWT token generation and verification
- `NODE_ENV` - Node.js environment (`development`, `production`)

## Optional Environment Variables

### Frontend
- `VITE_APP_NAME` - Application name (default: "AttendEase")
- `VITE_APP_VERSION` - Application version (default: from package.json)
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID (if using analytics)

### Feature Flags
- `VITE_ENABLE_ANALYTICS` - Enable/disable analytics features (default: `false`)
- `VITE_ENABLE_DEBUG` - Enable debug mode (default: `false` in production)

## Development Environment
For local development, create a `.env.development` file in the root directory with the required variables:

```env
VITE_APP_ENV=development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Production Deployment (Vercel)
When deploying to Vercel, set these environment variables in your project settings:

1. Go to your Vercel project
2. Navigate to Settings > Environment Variables
3. Add each variable from the Required section above
4. Add any additional variables from the Optional section as needed

## Security Notes
- Never commit `.env` files to version control
- Add `.env*` to your `.gitignore` file
- For production, use Vercel's environment variable management
- Rotate secrets and API keys regularly
- Use different credentials for different environments

## Variable Naming Convention
- Use `VITE_` prefix for variables that need to be exposed to the client-side code
- Use uppercase with underscores for all environment variables
- Keep sensitive variables out of client-side code

## Example `.env` File
```env
# Environment
NODE_ENV=production
VITE_APP_ENV=production

# API Configuration
VITE_API_BASE_URL=https://api.attendease.com

# Authentication
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

## Troubleshooting
- If environment variables are not being loaded, ensure:
  - The variable names match exactly (case-sensitive)
  - The Vite server has been restarted after adding new variables
  - The variables are prefixed with `VITE_` if they need to be accessible in the client-side code
  - The `.env` file is in the root directory of your project
