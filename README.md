# For Wabi: Our Little Garden

A mobile-first pixel-art monthsary website built with plain HTML, CSS, and JavaScript. It is ready for GitHub Pages and does not require a build step.

## Preview locally

Open `index.html` directly, or run a small local server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Personalize it

Most editable text is in `js/content.js`:

- recipient name
- relationship start date
- games
- memories
- reasons you love her
- letter paragraphs

To add photos, place them in `assets/images/`. The memory dialog currently uses a clearly labeled placeholder. You can replace the `.photo-placeholder` element in `index.html` with an image, or extend each memory object in `js/content.js` with an image path.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload everything inside this folder to the repository root.
3. Open the repository's **Settings**, then **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.

GitHub will provide the public website address after deployment.

## Included interactions

- Automatic days and completed months together, calculated from January 1, 2026
- Wrapped-style relationship cards
- Expandable memory collection
- Tap-to-reveal love notes
- Animated opening envelope and editable letter
- Animated flower bouquet finale
- Transparent game marks and a pixel-art Chiikawa corner decoration
- Full-screen chapter snapping for mobile swipes
- Mobile navigation, responsive layouts, keyboard support, and reduced-motion support
