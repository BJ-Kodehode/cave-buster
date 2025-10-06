# Cave B[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat&logo=clerk&logoColor=white)](https://clerk.com/)
[![Responsive](https://img.shields.io/badge/Mobile-Optimized-green?style=flat&logo=mobile&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/responsive_design_building_blocks)

## Features

• 🎬 Full CRUD operations for movies
• ⭐ Star-based rating system (1-5 stars)
• ✍️ Write and read detailed reviews
• 🔍 **Advanced search functionality with real-time results**
• 🎨 **Color-coded genre system with 20+ unique colors**
• ⌨️ **Keyboard navigation support in search**
• 📱 **Fully responsive mobile-optimized design**
• 🔒 Secure authentication with Clerk
• 📝 Input validation with Zod schemas
• 🌐 RESTful API with proper status codes
• 🎨 Dark mode optimized with warm color scheme
• 🚀 Deployed on Vercel
• 🏗️ **Organized documentation structure**

## Mobile Optimization

### 📱 **Responsive Design Features**
- **Mobile-first approach** with progressive enhancement
- **Touch-friendly interface** with optimized button sizes
- **Responsive typography** that scales across all devices
- **Flexible layouts** that adapt to screen orientation
- **Optimized spacing** for mobile interaction patterns
- **Responsive navigation** with mobile-specific controls

### 📐 **Screen Size Support**
- **📱 Mobile phones** (320px+): Compact layouts, stacked elements
- **📊 Tablets** (640px+): Improved spacing, semi-desktop layout
- **💻 Desktop** (1024px+): Full feature layout with sidebars
- **🖥️ Large screens** (1440px+): Enhanced visual hierarchystack movie review platform where film enthusiasts share their passion –
Rate, review, and discover cinema with advanced search and mobile-optimized experience!

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat&logo=clerk&logoColor=white)](https://clerk.com/)

## Features

• 🎬 Full CRUD operations for movies
• ⭐ Star-based rating system (1-5 stars)
• ✍️ Write and read detailed reviews
• � **Advanced search functionality with real-time results**
• 🎨 **Color-coded genre system with 20+ unique colors**
• ⌨️ **Keyboard navigation support in search**
• �🔒 Secure authentication with Clerk
• 📝 Input validation with Zod schemas
• 🌐 RESTful API with proper status codes
• 📱 Fully responsive design
• 🎨 Dark mode optimized with warm color scheme
• 🚀 Deployed on Vercel

## New Search Features

### 🔍 Real-time Search
- **Debounced search** with 250ms delay for optimal performance
- **Search across multiple fields**: titles, directors, genres, cast, and descriptions
- **Dropdown results** with movie details and genre tags
- **Keyboard navigation** with arrow keys, Enter, and Escape
- **Accessibility support** with proper ARIA attributes

### 🎨 Color-coded Genres
Each genre has its own distinctive color scheme:
- 🎬 **Action**: Red
- 🗺️ **Adventure**: Orange  
- 🎨 **Animation**: Pink
- 😄 **Comedy**: Yellow
- 🔍 **Crime**: Gray
- 📚 **Documentary**: Blue
- 🎭 **Drama**: Purple
- 👨‍👩‍👧‍👦 **Family**: Green
- 🧙‍♂️ **Fantasy**: Violet
- 📜 **History**: Amber
- 👻 **Horror**: Dark Red
- 🎵 **Music**: Indigo
- 🔮 **Mystery**: Slate
- 💕 **Romance**: Rose
- 🚀 **Science Fiction**: Cyan
- 📺 **TV Movie**: Teal
- ⚡ **Thriller**: Dark Red
- ⚔️ **War**: Stone
- 🤠 **Western**: Dark Yellow

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/BJ-Kodehode/cave-buster.git
cd cave-buster
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create `.env.local` in the root directory:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser

```
http://localhost:3000
```

## Built With

• [Next.js](https://nextjs.org/) - React framework with App Router
• [React](https://react.dev/) - JavaScript library for building user interfaces
• [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
• [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
• [MongoDB](https://www.mongodb.com/) - NoSQL database
• [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
• [Clerk](https://clerk.com/) - Authentication and user management
• [Zod](https://zod.dev/) - TypeScript-first schema validation
• [Lucide React](https://lucide.dev/) - Beautiful & consistent icons

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `POST /api/movies` - Create a new movie
- `GET /api/movies/[id]` - Get specific movie
- `PUT /api/movies/[id]` - Update movie
- `DELETE /api/movies/[id]` - Delete movie

### Reviews
- `GET /api/movies/[id]/reviews` - Get movie reviews
- `POST /api/movies/[id]/reviews` - Create review
- `PUT /api/movies/[id]/reviews/[reviewId]` - Update review
- `DELETE /api/movies/[id]/reviews/[reviewId]` - Delete review

### Search
- `GET /api/search?q=[query]` - Search movies by title, director, genre, cast, or description
• [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
• [Clerk](https://clerk.com/) - Authentication and user management
• [Zod](https://zod.dev/) - TypeScript-first schema validation

## Project Structure

```
cave-buster/
├── app/
│   ├── api/
│   │   ├── movies/          # Movie API routes
│   │   │   ├── route.ts     # GET all, POST new
│   │   │   └── [id]/
│   │   │       ├── route.ts       # GET one, PUT update, DELETE
│   │   │       └── reviews/
│   │   │           ├── route.ts   # GET/POST reviews
│   │   │           └── [reviewId]/
│   │   │               └── route.ts   # PUT/DELETE specific review
│   │   ├── search/          # Search API
│   │   │   └── route.ts     # GET search results
│   │   └── test/            # API testing endpoint
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── movies/
│   │   ├── new/            # Add movie page
│   │   └── [id]/           # Movie details page
│   │       └── edit/       # Edit movie page
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with attribution
│   ├── HomeClient.tsx      # Client-side homepage logic
│   └── globals.css         # Global styles with mobile optimization
├── components/
│   ├── MovieCard.tsx       # Movie card with color-coded genres (mobile-responsive)
│   ├── MovieForm.tsx       # Add/edit movie form
│   ├── SearchBar.tsx       # Advanced search component (mobile-optimized)
│   ├── MovieFilters.tsx    # Search and filter interface (responsive)
│   ├── ReviewForm.tsx      # Review submission form
│   ├── ReviewList.tsx      # Review display component
│   ├── EditMovieForm.tsx   # Movie editing form
│   └── DeleteButton.tsx    # Delete confirmation component
├── doc/                    # 📁 Documentation folder (reorganized)
│   ├── README.md           # Main project documentation
│   ├── CHANGELOG.md        # Version history and updates
│   ├── CONTRIBUTING.md     # Contribution guidelines
│   ├── DEPLOYMENT.md       # Deployment instructions
│   ├── QUICK_SETUP.md      # Quick start guide
│   ├── SECURITY.md         # Security policies
│   └── SETUP.md            # Detailed setup instructions
├── lib/
│   ├── mongodb.ts          # Database connection
│   ├── models/
│   │   ├── movie.ts        # Movie schema and model
│   │   └── review.ts       # Review schema and model
│   └── validations/
│       ├── movieSchema.ts  # Movie validation schemas
│       └── reviewSchema.ts # Review validation schemas
├── lib/
│   ├── mongodb.ts          # Database connection
│   ├── models/
│   │   ├── movie.ts        # Movie model
│   │   └── review.ts       # Review model
│   └── validations/
│       ├── movieSchema.ts   # Movie validation
│       └── reviewSchema.ts  # Review validation
├── types/
│   └── index.ts            # Type definitions
└── middleware.ts           # Clerk authentication middleware
```

## Search Functionality

The application features a sophisticated search system:

### Real-time Search
- **Debounced input**: 250ms delay to prevent excessive API calls
- **Multi-field search**: Searches across titles, directors, genres, cast, and descriptions
- **MongoDB text search**: Uses regex matching for flexible results
- **Error handling**: Graceful fallbacks for connection issues

### User Interface
- **Dropdown results**: Shows live search results as you type
- **Keyboard navigation**: Arrow keys, Enter, and Escape support
- **Accessibility**: Full ARIA support for screen readers
- **Loading states**: Visual feedback during search operations

### Color-coded Genres
- **Visual organization**: Each genre has a unique color scheme
- **Consistent styling**: Same colors in search results and movie cards
- **Enhanced UX**: Easier to identify movie types at a glance

## API Documentation

### Movies Endpoints

#### `GET /api/movies`
Fetch all movies.

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "title": "string",
      "director": "string", 
      "releaseYear": "number",
      "genre": "string",
      "reviews": "array"
    }
  ]
}
```

#### `GET /api/search`
Search movies across multiple fields.

**Query Parameters:**
- `q` (required): Search query string (minimum 2 characters)

**Example:** `/api/search?q=inception`

**Response:** 200 OK
```json
{
  "results": [
    {
      "_id": "string",
      "title": "Inception",
      "director": "Christopher Nolan",
      "releaseYear": 2010,
      "genre": "Sci-Fi"
    }
  ]
}
```

**Search Fields:**
- Movie titles
- Director names
- Genres
- Cast members
- Descriptions

#### `POST /api/movies`
Create a new movie (requires authentication).

**Request Body:**
```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "releaseYear": 2010,
  "genre": "Sci-Fi",
  "description": "Optional description",
  "runtime": 148,
  "cast": []
}
```

**Response:** 201 Created | 401 Unauthorized

#### `GET /api/movies/:id`
Fetch a single movie by ID.

**Response:** 200 OK | 404 Not Found

#### `PUT /api/movies/:id`
Update a movie (requires authentication + ownership).

**Response:** 200 OK | 403 Forbidden

#### `DELETE /api/movies/:id`
Delete a movie (requires authentication + ownership).

**Response:** 200 OK | 403 Forbidden

### Reviews Endpoints

#### `GET /api/movies/:id/reviews`
Fetch all reviews for a movie.

**Response:** 200 OK

#### `POST /api/movies/:id/reviews`
Create a review (requires authentication).

**Request Body:**
```json
{
  "reviewText": "Amazing movie with great visuals!",
  "rating": 5
}
```

**Response:** 201 Created | 409 Conflict

## Testing with Postman

A Postman collection is included for testing all API endpoints: `Cave-Buster-API.postman_collection.json`

To import and use:
1. Open Postman
2. Click "Import"
3. Select the `Cave-Buster-API.postman_collection.json` file
4. Test all endpoints with the provided examples

## Deployment

The application is deployed on Vercel with automatic CI/CD from GitHub.

### Environment Variables Required:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
```

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

The optimized build will be available in the `.next/` directory.

## Browser Support

• Chrome/Chromium 88+
• Firefox 85+
• Safari 14+
• Edge 88+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

**The Codeburglar got his code stolen.** Så takk til Marcus Børresen for å låne bort koden sin.

This project was inspired by and built upon the foundation of [Buster Block](https://buster-block.vercel.app/) created by Marcus Børresen. The original codebase provided the initial structure and design patterns that were adapted and extended for Cave Buster.

### Key Adaptations:
- **Search functionality**: Enhanced with real-time search and color-coded genres
- **UI improvements**: Warm color scheme and centered search interface  
- **Extended features**: Additional API endpoints and improved documentation
- **Custom styling**: Tailored design while maintaining the elegant foundation

Special thanks to Marcus Børresen for creating an excellent foundation to build upon.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*"All we have to decide is what to do with the films that are given to us."*

Built with ❤️ by BJ-Kodehode, adapted from Marcus Børresen's work
