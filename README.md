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

use VS Code's **Live Server**
extension for auto-reload.

---

