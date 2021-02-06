let walls = [];
let ray;
let particle;
function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < random(15); i++) {
		let x1 = random(width);
		let y1 = random(height);
		let x2 = random(width);
		let y2 = random(height);
		walls[i] = new Boundary(x1, y1, x2, y2);
	}
	walls.push(new Boundary(0, 0, width, 0));
	walls.push(new Boundary(0, 0, 0, height));
	walls.push(new Boundary(width, height, 0, height));
	walls.push(new Boundary(width, height, width, 0));
	particle = new Particle();
	// ray = new Ray(50, 150);
}

function draw() {
	background(0);
	for (let wall of walls) {
		wall.show();
	}
	particle.look(walls);
	particle.update(mouseX, mouseY);
}
