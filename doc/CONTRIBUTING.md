# Contributing to Cave Buster

First off, thank you for considering contributing to Cave Buster! It's people like you that make Cave Buster such a great tool.

Cave Buster is built upon the foundation of Marcus Børresen's [Buster Block](https://buster-block.vercel.app/) project, and we continue to evolve and enhance it with new features like advanced search functionality and color-coded genre systems.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Recent Features Added

Before contributing, familiarize yourself with our recent enhancements:

### 🔍 Search System
- Real-time search with debounced input
- Multi-field search (title, director, genre, cast, description)
- Keyboard navigation support
- Dropdown results with color-coded genres

### 🎨 Genre Color System
- 20+ unique color schemes for different genres
- Consistent styling across search results and movie cards
- Visual organization for better UX

### 📱 Mobile Optimization
- Complete responsive design overhaul
- Mobile-first approach with progressive enhancement
- Touch-friendly interface with optimized button sizes
- Responsive typography and layouts
- Mobile-optimized search and filter components

### 🏗️ Project Organization
- Documentation moved to `/doc/` folder
- Cleaner project structure
- Updated references and imports

### 🎯 UI Improvements
- Warm color scheme with amber accents
- Centered search interface
- Enhanced accessibility features

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the TypeScript and React styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code based on the Documentation Styleguide
* End all files with a newline

## Development Setup

1. Fork the repo
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/cave-buster.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
5. Set up environment variables (copy `.env.local.example` to `.env.local`)
6. Start the development server:
   ```bash
   npm run dev
   ```

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

* Use TypeScript for all new code
* Follow the existing code style
* Use meaningful variable and function names
* Add type annotations where helpful
* Use interfaces for object shapes
* Prefer `const` over `let` when possible

### React Styleguide

* Use functional components with hooks
* Keep components focused and single-purpose
* Use descriptive prop names
* Implement proper error boundaries
* Follow accessibility best practices

## Testing

* Write tests for new features
* Ensure all tests pass before submitting PR
* Aim for good test coverage
* Test both happy path and edge cases

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed

Thank you for contributing! 🎬