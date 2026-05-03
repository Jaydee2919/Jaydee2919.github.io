# Editing The Website

Open the editor from the GitHub repo folder.

Best workflow:

1. Double-click `START_EDITOR.command`.
2. Keep the Terminal window open.
3. Open `http://localhost:4173/admin.html` in your browser.
4. Edit content, add items, delete items, reorder rows, or hide/show sections.
5. Click `Save content.js`.
6. Open `http://localhost:4173/index.html` to preview.
7. In GitHub Desktop, commit and push the changes.

Fallback workflow:

1. Open `admin.html` directly in the browser.
2. Edit content.
3. Click `Download content.js`.
4. Replace the repo’s existing `content.js` file with the downloaded file.
5. Preview `index.html`.
6. Commit and push from GitHub Desktop.

Most future content changes should happen in `content.js` through the editor. The design lives in `styles.css`, and the rendering logic lives in `script.js`.
