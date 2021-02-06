class Particle {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.rays = [];
		for (let i = 0; i < 720; i += 1) {
			this.rays.push(new Ray(this.pos, radians(i)));
		}
	}

	show() {
		fill(255);
		ellipse(this.pos.x, this.pos.y, 8);
		for (let ray of this.rays) {
			ray.show();
		}
	}

	update(x, y) {
		this.pos.set(x, y);
	}

	look(walls) {
		for (let ray of this.rays) {
			let clos = null;
			let rec = Infinity;
			for (let wall of walls) {
				const pt = ray.cast(wall);
				if (pt) {
					const d = p5.Vector.dist(this.pos, pt);
					if (d < rec) {
						rec = d;
						clos = pt;
					}
				}
			}
			if (clos) {
				line(this.pos.x, this.pos.y, clos.x, clos.y);
			}
		}
	}
}
