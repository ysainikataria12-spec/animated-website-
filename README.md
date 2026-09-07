# Yogendra — Lithos

A full-screen, dark-themed hero built with **plain HTML + CSS + JS** — no
build step, no frameworks, no dependencies.

The signature interaction is a **cursor-following spotlight**: a hidden
canvas paints a soft radial gradient at the eased cursor position and applies
it as a CSS mask, revealing a second stratigraphic image inside a glowing
circle that trails the mouse (and finger drags on touch devices).

## Files

| File        | Purpose                                                        |
| ----------- | -------------------------------------------------------------- |
| `index.html`| Page structure, inline SVG icons, content                      |
| `style.css` | All styling, fonts (Inter + Playfair Display), load animations |
| `script.js` | The canvas spotlight mask + cursor smoothing loop              |

## Run locally

Just open `index.html` in a browser — or use VS Code's **Live Server**
extension for auto-reload.

---

## Publish on GitHub Pages (no Actions needed)

1. Push these files to the **root** of your repository on the `main` branch:

   ```bash
   git init
   git add index.html style.css script.js README.md
   git commit -m "Lithos hero"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub: repo → **Settings → Pages**.

3. Under **Build and deployment**:
   - **Source**: *Deploy from a branch*
   - **Branch**: `main` · folder: `/(root)` → **Save**.

4. Wait about a minute, then open:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

The repository must be **public** on GitHub Free. Hard-refresh with
`Ctrl+Shift+R` if your browser cached an older version.
