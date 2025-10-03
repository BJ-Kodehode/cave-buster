# Deployment Guide

This guide covers deploying Cave Buster to various platforms.

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- MongoDB Atlas database
- Clerk application

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial Cave Buster setup"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (Next.js should be auto-detected)

3. **Set Environment Variables**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   MONGODB_URI=your_mongodb_uri
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Test your live application

### Post-Deployment

1. Update Clerk allowed domains
2. Update MongoDB network access if needed
3. Test all functionality in production

## Alternative Platforms

### Netlify
- Similar process to Vercel
- May require additional configuration for API routes

### Railway
- Great for full-stack applications
- Built-in database options available

### Docker Deployment
- Use the included Dockerfile (if available)
- Configure environment variables
- Deploy to any Docker-compatible platform

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `MONGODB_URI`

## Monitoring

After deployment, monitor:
- Application performance
- Database usage
- Error logs
- User authentication flows

## Security Considerations

- Never commit `.env.local` to version control
- Use strong, unique database passwords
- Regularly rotate API keys
- Enable MongoDB IP whitelisting
- Use HTTPS in production

## Troubleshooting

### Common Deployment Issues

1. **Build Errors**
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Review environment variables

2. **Database Connection**
   - Check MongoDB URI format
   - Verify network access settings
   - Test connection from deployment platform

3. **Authentication Issues**
   - Verify Clerk domain configuration
   - Check environment variable names
   - Test auth flows in production

Happy deploying! 🚀