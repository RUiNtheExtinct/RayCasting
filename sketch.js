let walls = [];
let ray;
let particle;
let b = true,
	c = false,
	d = false;
let button1, button2, button3;
let x1, y1;
function setup() {
	createCanvas(windowWidth, windowHeight);
	// for (let i = 0; i < random(15); i++) {
	// 	let x1 = random(width);
	// 	let y1 = random(height);
	// 	let x2 = random(width);
	// 	let y2 = random(height);
	// 	walls[i] = new Boundary(x1, y1, x2, y2);
	// }
	walls.push(new Boundary(0, 0, width, 0));
	walls.push(new Boundary(0, 0, 0, height));
	walls.push(new Boundary(width, height, 0, height));
	walls.push(new Boundary(width, height, width, 0));
	button1 = createButton("Start Casting");
	button2 = createButton("Heavy Mode");
	button3 = createButton("Reset");
	button1.position(19, 19);
	button2.position(1200, 550);
	button3.position(19, 550);
	button1.mousePressed(start_ray);
	button2.mousePressed(start_heavy);
	button3.mousePressed(reset);
	// ray = new Ray(50, 150);
}

function start_heavy() {
	if (c) {
		c = ~c;
	}
	d = ~d;
	particle = new Particle();
}

function start_ray() {
	c = ~c;
	d = ~d;
	particle = new Particle();
}

function reset() {
	createCanvas(windowWidth, windowHeight);
	//b = true;
	c = false;
	//d = false;
	walls = [];
	walls.push(new Boundary(0, 0, width, 0));
	walls.push(new Boundary(0, 0, 0, height));
	walls.push(new Boundary(width, height, 0, height));
	walls.push(new Boundary(width, height, width, 0));
}

function draw() {
	background(0);
	stroke(255);
	if (mouseIsPressed && b && !c && !d) {
		x1 = mouseX;
		y1 = mouseY;
		b = false;
	}
	const x2 = mouseX;
	const y2 = mouseY;
	//line(x1,y1,x2,y2);
	if (!mouseIsPressed && !b && !c && !d) {
		b = true;
		walls.push(new Boundary(x1, y1, x2, y2));
		line(x1, y1, x2, y2);
	}
	if (mouseIsPressed && d) {
		const x1 = mouseX,
			y1 = mouseY;
		walls.push(new Boundary(x1, y1, pmouseX, pmouseY));
		line((x1, y1, pmouseX, pmouseY));
	}
	for (let wall of walls) {
		wall.show();
	}
	if (c) {
		particle.look(walls);
		particle.update(mouseX, mouseY);
	}
}
