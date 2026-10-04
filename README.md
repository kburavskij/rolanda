# Rolanda Aleknaite static recreation

This is a dependency-free static recreation of the Rolanda Aleknaite portfolio layout. The structure, copy, spacing, colors, navigation, contact form shape, and artwork detail flow mirror the reference page. Reference media is not included. Gallery and artwork areas use local CSS placeholders instead.

Each work on the home page links to `art.html?piece=...`. The detail template renders the selected work's title, materials, availability, price guidance, and a keyboard- and touch-friendly placeholder gallery.

## Run locally

Serve this directory over HTTP so the service worker can register:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

For example, open <http://localhost:4173/art.html?piece=poros-palaiminimas> to preview an artwork page.

## GitHub Pages

The included workflow deploys the contents of `master` to GitHub Pages after the repository is connected to GitHub. The contact form is a front-end demo and does not send data to a server.
