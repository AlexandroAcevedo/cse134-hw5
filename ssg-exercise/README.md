# HW5 Eleventy exercise

This separate exercise generates Home and About from `src/index.njk` and `src/about.njk`. Both include `src/_includes/footer.njk`. Other portfolio pages and assets are copied unchanged for working local navigation.

## Install, build and preview

Use Node.js 18 or newer. From this folder:

```sh
npm install
npm run build
npm run preview
```

Open http://localhost:8080/index.html and http://localhost:8080/about.html (use the port printed by Eleventy if different). Stop the preview with Ctrl+C.

## Verify the shared footer

1. Preview both pages and check their individual content and matching footer.
2. Stop the preview. In `src/_includes/footer.njk`, change `CSE 134B portfolio` to `CSE 134B portfolio — HW5 shared footer`.
3. Run `npm run build` and `npm run preview` again. Refresh both pages and confirm both footers changed. Keep the edited shared source.

The generated `_site` and `node_modules` folders are not needed in the repository. Keep the source, configuration and package files. The main portfolio deployment remains at the repository root.
