const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");
const fontSize = document.getElementById("fontsize");
const clearButton = document.getElementById("clear");
const downloadButton = document.getElementById("download");
const saveButton = document.getElementById("save");

let drawing = false;

// Set canvas size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function startPosition(e) {
  drawing = true;
  draw(e);
}

function endPosition() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = fontSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = textColor.value;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColor.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
  const link = document.createElement("a");
  link.download = "signature.png";
  link.href = canvas.toDataURL();
  link.click();
}

function saveCanvas() {
  localStorage.setItem("signature", canvas.toDataURL());
}

function loadCanvas() {
  const dataURL = localStorage.getItem("signature");
  if (dataURL) {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
}

// Event Listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
clearButton.addEventListener("click", clearCanvas);
downloadButton.addEventListener("click", downloadCanvas);
saveButton.addEventListener("click", saveCanvas);
window.addEventListener("load", loadCanvas);

// Initial background color
clearCanvas();
