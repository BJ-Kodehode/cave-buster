# Changelog

All notable changes to Cave Buster will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-10-06

### Added
- **Mobile Optimization**
  - Complete responsive design overhaul with mobile-first approach
  - Touch-friendly interface with optimized button sizes
  - Responsive typography that scales across all devices
  - Mobile-optimized search dropdown with better spacing
  - Responsive movie grid layout (280px min-width on mobile, 300px on desktop)
  - Mobile-specific navigation controls and layouts

- **Project Restructuring**
  - Moved all `.md` documentation files to `/doc/` folder for better organization
  - Updated all internal documentation references
  - Cleaner root directory structure

### Changed
- **Mobile-Responsive Components**
  - `SearchBar.tsx`: Added responsive padding, text sizes, and centered layout
  - `MovieCard.tsx`: Mobile-optimized layout with stacked buttons and responsive spacing
  - `MovieFilters.tsx`: Responsive grid layout (single column on mobile, 2-column on desktop)
  - `app/page.tsx`: Mobile-responsive attribution banner and setup screens
  - `HomeClient.tsx`: Optimized spacing and button layouts for mobile devices
  - `globals.css`: Updated movie grid with responsive breakpoints

- **Documentation Structure**
  - All markdown files now organized in `/doc/` folder
  - Updated README.md with mobile optimization features
  - Enhanced project structure documentation

### Technical Details
- **Responsive Breakpoints**: 
  - Mobile: 320px+ (compact layouts, stacked elements)
  - Tablet: 640px+ (improved spacing, semi-desktop layout)  
  - Desktop: 1024px+ (full feature layout)
  - Large screens: 1440px+ (enhanced visual hierarchy)
- **Mobile-First CSS**: All components use `sm:` Tailwind prefixes for progressive enhancement
- **Touch Optimization**: Larger touch targets and improved spacing for mobile interaction

## [0.2.0] - 2025-10-06

### Added
- **Advanced Search System**
  - Real-time search with 250ms debounced input
  - Multi-field search across titles, directors, genres, cast, and descriptions
  - Keyboard navigation support (Arrow keys, Enter, Escape)
  - Dropdown search results with live preview
  - New `/api/search` endpoint for MongoDB text search
  - Loading states and error handling

- **Color-coded Genre System**
  - 20+ unique color schemes for different movie genres
  - Consistent styling across search results and movie cards
  - Enhanced visual organization and UX
  - Genre-specific colors:
    - Action (Red), Adventure (Orange), Animation (Pink)
    - Comedy (Yellow), Crime (Gray), Documentary (Blue)
    - Drama (Purple), Family (Green), Fantasy (Violet)
    - History (Amber), Horror (Dark Red), Music (Indigo)
    - Mystery (Slate), Romance (Rose), Sci-Fi (Cyan)
    - TV Movie (Teal), Thriller (Dark Red), War (Stone)
    - Western (Dark Yellow)

- **UI/UX Improvements**
  - Warm color scheme with amber accents (`#3b2a26` background)
  - Centered search interface for better focus
  - Removed search icon for cleaner look
  - Attribution banner for Marcus Børresen
  - Enhanced accessibility with proper ARIA attributes

- **Documentation Updates**
  - Comprehensive README.md with new features
  - Updated API documentation with search endpoint
  - Enhanced project structure documentation
  - Added credits section acknowledging original work
  - Updated QUICK_SETUP.md with new features overview

### Changed
- **SearchBar Component**
  - Moved from Buster Block's gray theme to warm brown theme
  - Updated focus ring from purple to amber
  - Removed cast/actors input field from movie forms
  - Improved padding and spacing for better alignment

- **MovieCard Component**
  - Integrated color-coded genre system
  - Enhanced visual hierarchy with consistent styling
  - Better genre tag visibility and recognition

- **Movie Forms**
  - Simplified by removing optional cast input field
  - Streamlined data structure for better performance
  - Maintained backward compatibility with existing data

### Technical
- **Dependencies**
  - All packages up to date
  - Maintained compatibility with Next.js 15.5.4
  - Enhanced TypeScript support with proper interfaces

- **API Enhancements**
  - New search endpoint with MongoDB regex queries
  - Improved error handling and response formatting
  - Better type safety with updated interfaces

- **Performance**
  - Debounced search to reduce server load
  - Optimized MongoDB queries for faster results
  - Efficient re-rendering with proper React patterns

### Credits
This version builds upon the excellent foundation created by Marcus Børresen's [Buster Block](https://buster-block.vercel.app/) project. The original codebase provided the structure and design patterns that were adapted and extended for these new features.

## [0.1.0] - 2025-10-05

### Added
- Initial release based on Marcus Børresen's Buster Block
- Full CRUD operations for movies
- Star-based rating system (1-5 stars)
- User authentication with Clerk
- MongoDB integration with Mongoose
- RESTful API with proper status codes
- Responsive design with dark mode
- Movie review system
- TypeScript throughout the application
- Tailwind CSS for styling
- Zod schema validation

### Foundation
- Based on [Buster Block](https://buster-block.vercel.app/) by Marcus Børresen
- Adapted for Cave Buster with extended functionality
- Maintained original design principles while adding new features