//import Boundary from "./boundary.js";

/*class Boundary {
	constructor(x1, y1, x2, y2) {
		this.a = createVector(x1, y1);
		this.b = createVector(x2, y2);
	}

	show() {
		stroke(255);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}
}*/

let b;
function setup() {
	createCanvas(400, 400);
	b = new Boundary(300, 100, 200, 200);
}

function draw() {
	background(0);
	b.show();
}
