# CLAUDE.md - Development Guide

## Project Overview
This is a static wedding website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Local Development

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```
- Opens at `http://localhost:5173` (default Vite port)
- Hot module replacement (HMR) enabled
- Auto-reloads on file changes

### Build for Production
```bash
npm run build
```
- Outputs to `dist/` directory
- Optimized and minified assets
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Test before deploying

### Linting
```bash
npm run lint
```

## Testing with Playwright MCP

### Visual Testing in Browser
Use the Playwright MCP tools to test the website in a real browser:

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Navigate**: Ask Claude to navigate to `http://localhost:5173`

3. **Capture snapshots**:
   - Take accessibility snapshots (preferred for interaction)
   - Take screenshots for visual verification

4. **Interact**:
   - Click elements
   - Fill forms
   - Scroll page
   - Wait for content

5. **Test production build**:
   ```bash
   npm run build && npm run preview
   ```
   Navigate to `http://localhost:4173`

### Common Playwright Tasks
- Check console for JavaScript errors
- Monitor network requests
- Test responsive design (resize browser)
- Verify animations and interactions

## Project Structure
- `/src` - Source code
- `/public` - Static assets
- `/dist` - Production build output (generated)
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind configuration

## Key Files
- [vite.config.ts](vite.config.ts) - Vite configuration with React plugin
- [package.json](package.json) - Dependencies and scripts
- [tsconfig.json](tsconfig.json) - TypeScript configuration

## Notes
- The project uses React 19 with the new JSX transform
- Lucide React is excluded from Vite's dependency optimization
- Tailwind CSS 4 is configured with PostCSS
