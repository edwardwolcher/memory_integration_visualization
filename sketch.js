const memories = [];
const textFalls = [];
let backgroundImage;
let shorterSide;
let center;
let cursorPosition;
let probMax, probMin;

const G = 4;

function preload() {
  backgroundImage = loadImage("head.png");
}
function setup() {
  shorterSide = min(windowWidth, windowHeight);
  const cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  center = createVector(width / 2, height / 2);
  cursorPosition = createVector(0, 0);
  const probs = textArray
    .filter((textObj) => textObj != null)
    .map((textObj) => textObj.prob);
  probMax = max(probs);
  probMin = min(probs);
}

function windowResized() {
  shorterSide = min(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  center = createVector(width / 2, height / 2);
}

function mousePressed() {
  const idx = int(random(0, 1000));
  const memory = new Memory(cursorPosition.x, cursorPosition.y, idx);
  memories.push(memory);
}

function draw() {
  cursorPosition.set(mouseX, mouseY);
  memories.forEach((memory) => {
    memory.update();
    memory.draw();
  });
  textFalls.forEach((textFall) => {
    textFall.update();
    textFall.draw();
  });
  image(backgroundImage, 0, 0, width, height);
}

class TextFall {
  constructor(idx, color) {
    this.str = textArray[idx].str;
    const prob = textArray[idx].prob;
    this.textSize = map(prob, probMin, probMax, 8, 48);
    console.log(this.textSize);
    this.color = color;
    this.pos = createVector(random(-width * 0.2, width * 0.8), 0);
  }
  update() {
    this.pos.y += 1;
  }
  draw() {
    push();
    textSize(this.textSize);
    fill(this.color);
    text(this.str, this.pos.x, this.pos.y);
    pop();
  }
}

class Memory {
  constructor(x, y, idx) {
    this.pos = createVector(x, y);
    this.idx = idx;
    this.sound = loadSound(`audio/mic_${this.idx}.mp3`, () => {
      this.sound.loop();
    });
    this.fft = new p5.FFT();
    this.fft.setInput(this.sound);
    this.angle = random(TWO_PI);
    this.rotation = random(-0.02, 0.02);
    this.radius = 0;
    const hue = map(this.idx, 0, 1000, 0, 360);
    this.color = color(hue, 30, 80, 0.4);
    this.lifespan = int(random(240, 1200));
    this.lifetime = 0;
    this.velocity = p5.Vector.random2D();
    this.maxRadius = random(width / 16, width / 2);
    this.filter = new p5.Filter(random(["highpass", "lowpass"]));
    this.filter.process(this.sound);
    this.reverb = new p5.Reverb();
    this.reverb.process(this.sound, 40, 0);
    if (textArray[this.idx]) {
      const textFall = new TextFall(this.idx, this.color);
      textFalls.push(textFall);
    }
  }

  update() {
    if (this.lifetime > this.lifespan) {
      const memoriesIndex = memories.findIndex((memory) => memory == this);
      this.sound.stop();
      memories.splice(memoriesIndex, 1);
    }
    this.lifetime++;
    const cursorDistance = p5.Vector.dist(this.pos, cursorPosition);
    const force = p5.Vector.sub(center, this.pos);
    const distanceSq = constrain(force.magSq(), 100, 1000);
    const strength = G / distanceSq;
    force.setMag(strength);
    this.velocity.add(force);
    this.pos.add(this.velocity);
    const ageFactor = sin(map(this.lifetime, 0, this.lifespan, 0, PI));
    this.radius = ageFactor * this.maxRadius;
    const rate = map(ageFactor, 0, 1, 0.5, 1);
    this.sound.rate(rate);
    this.angle += this.rotation;
    const frequency = map(ageFactor, 0, 1, 10, 2000);
    this.filter.set(frequency, 0);
    this.sound.pan(constrain(map(this.pos.x, 0, width, -1.0, 1.0), -1.0, 1.0));
    const baseVolume = map(cursorDistance, shorterSide, 0, 0.0, 0.5);
    const adjustedVolume =
      map(this.radius, 0, this.maxRadius, 0, 1) * baseVolume;
    this.sound.setVolume(adjustedVolume);
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(this.color);
    noStroke();
    circle(0, 0, this.radius * 2);
    const waveform = this.fft.waveform();
    noFill();
    stroke(240, 80);
    strokeWeight(map(this.radius, 0, this.maxRadius, 0.5, 10));
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      const x = map(i, 0, waveform.length, -this.radius, this.radius);
      const angle = map(x, -this.radius, this.radius, -PI, 0);
      const y = map(waveform[i], -1, 1, -this.radius, this.radius) * sin(angle);
      vertex(x, y);
    }
    endShape();
    pop();
  }
}
