
const canvas = document.getElementById("pipesCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const pipes = [];
const colors = ["#00ffff", "#ff4500", "#00ff00", "#ffa500"];
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function Pipe(x, y, dir, color) {
  this.x = x;
  this.y = y;
  this.dir = dir;
  this.color = color;
  this.length = 0;
}

Pipe.prototype.update = function () {
  this.length++;
  if (this.length > 20) {
    const newDir = directions[Math.floor(Math.random() * directions.length)];
    pipes.push(new Pipe(this.x, this.y, newDir, this.color));
    return false;
  }
  this.x += this.dir[0] * 10;
  this.y += this.dir[1] * 10;
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.dir[0] * 10, this.y + this.dir[1] * 10);
  ctx.stroke();
  return true;
};

function animate() {
  if (pipes.length < 60) {
    pipes.push(
      new Pipe(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        directions[Math.floor(Math.random() * directions.length)],
        colors[Math.floor(Math.random() * colors.length)]
      )
    );
  }
  for (let i = pipes.length - 1; i >= 0; i--) {
    if (!pipes[i].update()) pipes.splice(i, 1);
  }
  requestAnimationFrame(animate);
}

animate();
