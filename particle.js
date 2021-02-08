class Particle {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.rays = [];
		// this.rays.push(new Ray(this.pos, radians(170)));
		for (let i = 0; i < 360; i += 0.5) {
			this.rays.push(new Ray(this.pos, radians(i)));
		}
	}

	show() {
		fill(255, 231, 0);
		ellipse(this.pos.x, this.pos.y, 8);
		for (let ray of this.rays) {
			ray.show();
		}
	}

	update(x, y) {
		this.pos.set(x, y);
	}

	look(walls, reflect_flag) {
		stroke(255, 231, 0);
		for (let ray of this.rays) {
			let clos = null;
			let rec = Infinity;
			let wall_ref = null;
			for (let wall of walls) {
				const pt = ray.cast(wall);
				if (pt) {
					const d = p5.Vector.dist(this.pos, pt);
					if (d < rec) {
						rec = d;
						clos = pt;
						wall_ref = wall;
					}
				}
			}
			if (clos) {
				line(this.pos.x, this.pos.y, clos.x, clos.y);
				if (reflect_flag) {
					const pos_ref = createVector(clos.x, clos.y);
					let ang_ref;
					const A = this.pos.y - clos.y;
					const B = clos.x - this.pos.x;
					const D = wall_ref.a.y - wall_ref.b.y;
					const E = wall_ref.b.x - wall_ref.a.x;
					ang_ref = degrees(
						(A * E * E - A * D * D - 2 * B * D * E) /
							(B * E * E - B * D * D + 2 * A * D * E)
					);
					const ray_ref = new Ray(pos_ref, radians(ang_ref));
					ray_ref.show();
					/* let clos_ref = null;
					let rec_ref = Infinity;
					for (let wall of walls) {
						const pt_ref = ray_ref.cast(wall);
						if (pt_ref) {
							const d = p5.Vector.dist(clos, pt_ref);
							if (d < rec_ref) {
								rec_ref = d;
								clos_ref = pt_ref;
							}
						}
					}
					if (clos_ref) {
						// console.log(clos.x, clos.y, clos_ref.x, clos_ref.y);
						line(clos.x, clos.y, clos_ref.x, clos_ref.y);
					} */
				}
			}
		}
	}
}
