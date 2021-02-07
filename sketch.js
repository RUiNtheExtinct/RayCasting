let walls = [];
let ray;
let particle;
let b = true,
	c = false,
	d = false,
	reflect_flag = false;
let b1, b2, b3, b4;
let x1, y1;
function setup() {
	createCanvas(windowWidth, windowHeight);
	walls.push(new Boundary(0, 0, width, 0));
	walls.push(new Boundary(0, 0, 0, height));
	walls.push(new Boundary(width, height, 0, height));
	walls.push(new Boundary(width, height, width, 0));
	b1 = createButton("Start Casting");
	b2 = createButton("Heavy Mode");
	b3 = createButton("Reset");
	//b4 = createButton("Reflect\n  (Beta)");
	b1.position(19, 19);
	b2.position(1200, 550);
	b3.position(19, 550);
	//b4.position(1200, 19);
	b1.mousePressed(start_ray);
	b2.mousePressed(start_heavy);
	b3.mousePressed(reset);
	//b4.mousePressed(reflect);
}

function reflect() {
	reflect_flag = ~reflect_flag;
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
	d = false;
	particle = new Particle();
}

function reset() {
	createCanvas(windowWidth, windowHeight);
	//b = true;
	c = false;
	reflect_flag = false;
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
			y1 = mouseY,
			x2 = pmouseX,
			y2 = pmouseY;
		walls.push(new Boundary(x1, y1, x2, y2));
		line((x1, y1, x2, y2));
	}
	for (let wall of walls) {
		wall.show();
	}
	if (c) {
		particle.look(walls, reflect_flag);
		particle.update(mouseX, mouseY);
	}
}
