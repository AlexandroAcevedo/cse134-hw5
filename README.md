# CSE 134B — Homework 5

This portfolio includes Chiikawa's Useless Facts, a custom Web Component on `projects.html`.

## Design note

A visitor can discover a random fact without leaving the Projects page. Clicking the fact button calls the component's `loadFact()` method, which sends a GET request to the Useless Facts API. The component checks the HTTP status, parses the JSON, and validates that the `text` field is a nonempty string. It then updates the fact paragraph using `textContent`. While waiting, the status says that a fact is loading and the request button is disabled. On success, the new fact appears and the status confirms it loaded. If the request fails, the previous fact stays visible and the status explains the failure. The button is enabled again so the visitor can retry without reloading. The status uses `role="status"` for assistive technology.

The external mode button changes the observed `compact` attribute. The component hides or shows extra details without resetting the fact. The selected mode is saved in localStorage when available, and the component uses CSS custom properties to fit both portfolio themes.

## Static site generation exercise

The separate Eleventy project is in `ssg-exercise/`. Preview Home (`index.html`) and About (`about.html`). Both use the same footer include. See [the exercise README](ssg-exercise/README.md) for installation, build, preview, and shared-footer verification instructions. The main deployed portfolio remains the original root site.
