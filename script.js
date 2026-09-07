/* ------------------------------------------------------------------ */
/*  Lithos — cursor-following spotlight reveal                         */
/*                                                                     */
/*  A hidden canvas paints a soft radial gradient at the (eased)       */
/*  cursor position, gets serialized with toDataURL(), and is applied  */
/*  as a CSS mask on the second image layer — so the "reveal" photo    */
/*  is only visible inside the glowing circle that trails the cursor.  */
/* ------------------------------------------------------------------ */

const SPOTLIGHT_R = 260;

const canvas = document.getElementById('maskCanvas');
const reveal = document.getElementById('revealLayer');
const ctx = canvas.getContext('2d');

// Raw mouse target + eased position (both start off-screen).
const mouse = { x: -999, y: -999 };
const smooth = { x: -999, y: -999 };

/** Size the hidden canvas to the viewport. */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/** Redraw the radial spotlight mask and apply it to the reveal layer. */
function applyMask() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createRadialGradient(
    smooth.x,
    smooth.y,
    0,
    smooth.x,
    smooth.y,
    SPOTLIGHT_R
  );
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
  gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
  gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
  ctx.fill();

  const maskImage = `url("${canvas.toDataURL()}")`;
  reveal.style.maskImage = maskImage;
  reveal.style.webkitMaskImage = maskImage;
  reveal.style.maskSize = '100% 100%';
  reveal.style.webkitMaskSize = '100% 100%';
  reveal.style.maskRepeat = 'no-repeat';
  reveal.style.webkitMaskRepeat = 'no-repeat';
}

/* ------------------------- Input tracking ------------------------- */
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Touch support: the spotlight follows the dragging finger on mobile.
window.addEventListener(
  'touchmove',
  (e) => {
    const touch = e.touches[0];
    if (touch) {
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    }
  },
  { passive: true }
);

/* ----------------------- Eased animation loop ---------------------- */
function loop() {
  const dx = mouse.x - smooth.x;
  const dy = mouse.y - smooth.y;

  // Lerp toward the cursor for a buttery, trailing spotlight.
  smooth.x += dx * 0.1;
  smooth.y += dy * 0.1;

  // Skip redundant redraws once the spotlight has settled.
  if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
    applyMask();
  }

  requestAnimationFrame(loop);
}

/* ---------------------------- Boot -------------------------------- */
window.addEventListener('resize', () => {
  resizeCanvas();
  applyMask();
});

resizeCanvas();
applyMask();
requestAnimationFrame(loop);
