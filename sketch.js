// GLOBALNE ZMIENNE
let buttonX, buttonY, buttonW, buttonH;
let hoverCount = 0;
let wasHovered = false;

let inputText = '';
let scaleFactor = 1;
let zoomStep = 0.03;
let minScale = 0.1;

let mode = 'start'; // 'start' lub 'secondSketch'

function setup() {
  createCanvas(1920, 1080);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(55);

  buttonX = width / 2;
  buttonY = height / 2;
  buttonW = 700;
  buttonH = 200;
}

function draw() {
  if (mode === 'start') {
    drawStartScreen();
  } else if (mode === 'secondSketch') {
    drawSecondScreen();
  }
}

function drawStartScreen() {
  background('#FFFFFF');
  
  fill(0, 0);
  noStroke();
  rect(width / 2, height / 2, 1810, 970);
  
  let isHovered = mouseX > buttonX - buttonW / 2 &&
                  mouseX < buttonX + buttonW / 2 &&
                  mouseY > buttonY - buttonH / 2 &&
                  mouseY < buttonY + buttonH / 2;

  if (isHovered && !wasHovered) {
    hoverCount++;
  }
  wasHovered = isHovered;

  if (hoverCount >= 6) {
    fill(0);
    rect(buttonX, buttonY, buttonW, buttonH);

    fill(0, 0, 255);
    text("https://tryagain.com", buttonX, buttonY);

    stroke(0, 0, 255);
    strokeWeight(3);
    let textWidthVal = textWidth("https://tryagain.com");
    line(buttonX - textWidthVal / 2, buttonY + 30, buttonX + textWidthVal / 2, buttonY + 30);

    noStroke();
  } else {
    if (!isHovered) {
      fill(0);
      rect(buttonX, buttonY, buttonW, buttonH);

      fill(255);
      text("End the game", buttonX, buttonY);
    }
  }
}

function mousePressed() {
  if (mode === 'start' && hoverCount >= 5) {
    let textWidthVal = textWidth("https://tryagain.com");
    let inX = mouseX > buttonX - textWidthVal / 2 && mouseX < buttonX + textWidthVal / 2;
    let inY = mouseY > buttonY - 55 / 2 && mouseY < buttonY + 55 / 2;
    if (inX && inY) {
      mode = 'secondSketch';
      inputText = '';
      scaleFactor = 1;
      textSize(36);
      textAlign(CENTER, CENTER);
    }
  }
}

// DRUGI EKRAN

function drawSecondScreen() {
  background(0, 0, 0);
  push();
  translate(width / 2, height / 2);
  scale(scaleFactor);
  drawGooglePage();
  pop();
}

function drawGooglePage() {
  fill(66, 133, 244); text('Well', -170, -100);
  fill(234, 67, 53);  text('come', -91, -100);
  fill(251, 188, 5);  text('to', -23, -100);
  fill(66, 133, 244); text('the', 34, -100);
  fill(52, 168, 83);  text('Inter', 109, -100);
  fill(234, 67, 53);  text('net!', 175, -100);

  fill(255);
  stroke(200);
  rectMode(CENTER);
  rect(0, 0, 400, 50, 10);

  textSize(24);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  text(inputText, -190, 0);
}

function keyTyped() {
  if (mode === 'secondSketch') {
    if (key.length === 1 && key !== '\n') {
      inputText += key;
      scaleFactor = max(scaleFactor - zoomStep, minScale);
    }
  }
}

function keyPressed() {
  if (mode === 'secondSketch') {
    if (keyCode === BACKSPACE) {
      inputText = inputText.slice(0, -1);
      scaleFactor = min(scaleFactor + zoomStep, 1);
    }
  }
}
