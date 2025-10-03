# Environment Setup Guide

This guide will help you set up the necessary environment variables for Cave Buster.

## Required Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

### Clerk Authentication

1. Go to [Clerk.com](https://clerk.com) and create a new application
2. Copy your publishable key and secret key:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### MongoDB Database

1. Create a MongoDB Atlas account at [MongoDB.com](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cavebuster?retryWrites=true&w=majority
```

## Complete .env.local Example

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cavebuster?retryWrites=true&w=majority
```

## Testing the Setup

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Visit `http://localhost:3000`
4. Try signing up/signing in
5. Create a movie and add a review

## Troubleshooting

### Common Issues

1. **Clerk not working**: Check that your keys are correct and domains are configured
2. **Database connection error**: Verify MongoDB URI and network access
3. **Build errors**: Ensure all environment variables are set

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit [Clerk documentation](https://clerk.com/docs)
- See [MongoDB documentation](https://docs.mongodb.com/)

Happy coding! 🎬