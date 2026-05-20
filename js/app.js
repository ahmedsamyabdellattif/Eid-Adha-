window.addEventListener('DOMContentLoaded', () => {

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const W = 1080;
const H = 1440;

canvas.width = W;
canvas.height = H;
canvas.style.aspectRatio = '1080 / 1440';

const BOX = {
  x: 289,
  y: 705,
  w: 510,
  h: 63
};

const nameInput = document.getElementById('nameInput');
const downloadBtn = document.getElementById('downloadBtn');

/* Background */
let bgImage = new Image();
bgImage.src = './assets/Eaid design employer.jpg';

bgImage.onload = () => draw();

/* Resize */
function resizeCanvas() {

  const viewer = document.querySelector('.viewer');
  if (!viewer) return;

  const scale = Math.min(
    viewer.clientWidth / W,
    viewer.clientHeight / H
  );

  canvas.style.width = `${W * scale}px`;
  canvas.style.height = `${H * scale}px`;
}

window.addEventListener('resize', resizeCanvas);

/* Font Fit */
function fitFont(text, maxWidth) {

  let size = 40;

  ctx.font = `${size}px "RB"`;

  while (size > 20 && ctx.measureText(text).width > maxWidth) {
    size--;
    ctx.font = `${size}px "RB"`;
  }

  return size;
}

/* Draw */
function draw() {

  ctx.clearRect(0, 0, W, H);

  if (bgImage.complete) {
    ctx.drawImage(bgImage, 0, 0, W, H);
  }

  const text = nameInput.value || 'Enter your name';

  const fontSize = fitFont(text, BOX.w - 20);

  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = `${fontSize}px "RB"`;
  ctx.fillStyle = '#ffffff';

  ctx.fillText(
    text,
    BOX.x + BOX.w / 2,
    BOX.y + BOX.h / 2
  );
}

/* Input */
nameInput.addEventListener('input', draw);

/* Download */
downloadBtn.addEventListener('click', () => {

  draw();

  const link = document.createElement('a');

  const filename = (nameInput.value || 'card').replace(/\s+/g, '_');

  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
});

/* Init */
resizeCanvas();
draw();

});