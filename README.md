# Rolanda Aleknaite static recreation

This is a dependency-free static recreation of the Rolanda Aleknaite portfolio layout. The structure, copy, spacing, colors, navigation, contact form shape, and gallery behavior mirror the reference page. Reference media is not included. Gallery and portrait areas use local CSS placeholders instead.

## Run locally

Serve this directory over HTTP so the service worker can register:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## GitHub Pages

The included workflow deploys the contents of `master` to GitHub Pages after the repository is connected to GitHub. The contact form is a front-end demo and does not send data to a server.
