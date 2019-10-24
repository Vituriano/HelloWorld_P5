gravity = [0, 0.3];
balls = [];

class Ball {
  constructor(x, y, vx, vy) {
    this.position = [x, y];
    this.velocity = [vx, vy];
    this.radius = random(50, 100);
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }
  show() {
    fill(this.color);
    noStroke();
    circle(this.position[0], this.position[1], this.radius * 2);
  }
  update() {
    this.position = vectorSum(this.position, this.velocity);
    this.velocity = vectorSum(this.velocity, gravity);
    if (this.checkCollision()) {
      // a bolinha colidiu
      this.velocity[1] = ceil(-this.velocity[1]);
      this.position[1] = height - this.radius;
    }
  }
  checkCollision() {
    if (this.radius + this.position[1] >= height) {
      return true;
    }
    return false;
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(width / 2, height / 2);
}

function mouseClicked() {
  balls.push(new Ball(mouseX, mouseY, mouseX - pmouseX, mouseY - pmouseY));
}

function displayBall() {
  for (let ball of balls) {
    ball.update();
    ball.show();
  }
}

function draw() {
  background(255, 255, 255);
  displayBall();
}