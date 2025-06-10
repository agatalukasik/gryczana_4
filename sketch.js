let buttonX, buttonY, buttonW, buttonH;
let hoverCount = 0;
let wasHovered = false;

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

  if (hoverCount >= 5) {
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