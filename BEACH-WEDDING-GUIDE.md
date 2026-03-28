# Beach Wedding Page - Development Guide

## Overview

The beach wedding page is an independent single-page app living at `/beach-wedding`. It has its own HTML entry, CSS, and React entry point — completely separate from the main AMARA website. It shares the same repo and Vite build but has no dependencies on the main app's components, fonts, or styles.

**Live URL (after deploy):** `https://amara.wedding/beach-wedding/`

## Project Structure

```
beach-wedding/
  index.html              <- HTML entry point for this page

src/beach-wedding/
  main.tsx                <- React entry point (mounts BeachWedding component)
  index.css               <- Tailwind CSS (independent from main app)
  BeachWedding.tsx         <- The full page component (venues, gallery, accordions)
```

## Tech Stack

- React 19 + TypeScript
- Vite 7 (multi-page setup)
- Tailwind CSS 4
- Framer Motion (animations)
- Lucide React (icons)

No external UI libraries — `Button`, `Card`, `Accordion` components are defined inline at the top of `BeachWedding.tsx`.

---

## Getting Started

### 1. Sync with upstream (Doga's repo)

If you haven't added the upstream remote yet:

```bash
git remote add upstream git@github.com:DogaOztuzun/amara-website.git
```

Pull latest changes:

```bash
git fetch upstream
git merge upstream/main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

The beach wedding page is at: **http://localhost:5173/beach-wedding/**

Vite has hot reload (HMR) — save a file and see changes instantly in the browser.

### 4. Build & preview production

```bash
npm run build
npm run preview
```

Production preview at: **http://localhost:4173/beach-wedding/**

---

## Making Changes

All your work should be in these files:

| What | Where |
|------|-------|
| Page content, layout, components | `src/beach-wedding/BeachWedding.tsx` |
| Page styles (Tailwind config, global CSS) | `src/beach-wedding/index.css` |
| Page HTML shell (title, meta tags) | `beach-wedding/index.html` |
| Images | `public/gallery/beach-wedding/` |

### Key things to know

- The page is a single React component (`BeachWedding.tsx`) with inline UI primitives (`Button`, `Card`, `Accordion` etc.) defined at the top of the file.
- Styling is all Tailwind utility classes — no separate CSS files needed for components.
- The page uses a dark theme (`bg-stone-950 text-stone-100`) — different from the main site.
- Venue data is defined as a `venues` array near the top of the file. Edit venue info there.
- Images are loaded from external URLs (venue websites). To use local images, place them in `public/gallery/beach-wedding/` and reference as `/gallery/beach-wedding/filename.jpg`.

---

## Using Claude Code with Chrome Browser Control

Claude Code can control a Chrome browser to see your page, check the layout, read console logs, and interact with elements. This is useful for visual QA and debugging.

### Setup

1. Install the **Claude Code Chrome Extension** (Side Panel extension) in your Chrome browser.
2. Make sure the dev server is running (`bun run dev`).

### What Claude Code can do in the browser

| Task | How to ask |
|------|-----------|
| **Open the page** | "Open http://localhost:5173/beach-wedding/ in Chrome" |
| **Take a screenshot** | "Take a screenshot of the beach wedding page" |
| **Check layout/design** | "Does the hero section look right?" or "Screenshot the venue cards" |
| **Read console errors** | "Check the browser console for errors" |
| **Click/interact** | "Click on the Fimi Island venue card" |
| **Test responsive** | "Resize the browser to mobile width and screenshot" |
| **Record a GIF** | "Record a GIF of me scrolling through the venue section" |
| **Read page text** | "Read all the text on the beach wedding page" |
| **Check network** | "Are there any failed image loads?" |

### Example workflow with Claude Code

```
You: "Start the dev server and open the beach wedding page in Chrome"
You: "Screenshot the hero section — does the venue image load?"
You: "Check the console for any errors"
You: "Resize to 375px width and screenshot — is mobile layout okay?"
You: "I changed the venue card layout, take a screenshot and compare"
```

### Tips

- Always make sure the dev server is running before asking Claude to open the page.
- If the Chrome extension disconnects, refresh the page and try again.
- Claude can see the actual rendered page, not just the code — use it to catch visual issues.
- Ask Claude to check the console after making changes to catch runtime errors early.

---

## Pushing Changes & Creating a PR

### 1. Commit your changes

```bash
git add src/beach-wedding/ beach-wedding/ public/gallery/beach-wedding/
git commit -m "Update beach wedding page: <brief description>"
```

### 2. Push to your fork

```bash
git push origin main
```

### 3. Create a Pull Request

Go to your fork on GitHub and click **"Contribute" > "Open pull request"**.

- **Base repository:** `DogaOztuzun/amara-website`
- **Base branch:** `main`
- **Head repository:** your fork
- **Head branch:** `main`

Or use GitHub CLI:

```bash
gh pr create --repo DogaOztuzun/amara-website --title "Update beach wedding page" --body "Description of changes"
```

### 4. Deploy

After Doga merges your PR, Vercel auto-deploys to production.

---

## Quick Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `git fetch upstream && git merge upstream/main` | Sync with Doga's repo |
| `git push origin main` | Push to your fork |
