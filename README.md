# Bhavishya Gaur — Spatial Portfolio

Complete HTML, CSS, and JavaScript for the latest published portfolio, including the motion fix.

## Start

Extract the ZIP and open `index.html` in a browser. For a local server, open PowerShell in the extracted folder and run:

```powershell
py -m http.server 8000
```

Visit http://localhost:8000. No npm dependencies or build step are required.

## Files

- index.html: page content and structure.
- styles.css: spatial layout, cyan/mint theme, responsive design, fonts, and animations.
- script.js: project explorer, command palette, portfolio terminal, clipboard, and animation controls.
- assets/favicon.svg: browser icon.

## Included updates

Delhi location; updated LinkedIn at https://www.linkedin.com/in/bhavishya-gaur; terminal-style About section; five actual project repositories; visible ring and floating-panel animations; synchronized Motion controls beside the introduction and in the bottom toolbar.

The device reduced-motion setting determines the initial animation state. Clicking Motion explicitly enables or pauses decorative animations, including when reduced motion is enabled.

The terminal displays predefined portfolio information. It does not execute system commands or transmit input. Project panels show workflow overviews, not product screenshots. Google Fonts are optional; fallback fonts work without Internet access.

## Put it in your existing GitHub repository

Copy index.html, styles.css, script.js, and assets into your Portfolio checkout. Preview the result, then from that repository:

```powershell
git add index.html styles.css script.js assets/favicon.svg
git diff --cached --check
git commit -m "Add spatial portfolio and working motion controls"
git push origin HEAD
```

If your repository has other uncommitted edits, review them separately before committing.

## Vercel

Use Framework Preset: Other. Leave Build Command empty. Serve the directory containing index.html as the site root. If these files are at the repository root, leave Root Directory at its default. The linked production branch will deploy when you push.

## Validation

JavaScript syntax, DOM interactions, stylesheet parsing, and animation/pause CSS rules under normal and reduced-motion settings were checked. Browser visual rendering still needs a desktop/mobile review.
