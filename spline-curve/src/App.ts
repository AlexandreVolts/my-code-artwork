import { Keyboard } from "./Keyboard";
import { Ship } from "./Ship";
import { Spline } from "./Spline";

export class App
{
	public static readonly WIDTH = window.innerWidth;
	public static readonly HEIGHT = window.innerHeight;
	private static readonly MODIFICATOR = 200;
	private static readonly SHIP_SPEED = 150;
	private static readonly NB_POINTS = 10;
	private readonly canvas: HTMLCanvasElement;
	private readonly ctx: CanvasRenderingContext2D;
	private readonly spline = App.generateSpline();
	private readonly keyboard = new Keyboard(App.NB_POINTS);
	private readonly ship = new Ship();
	private progression = 0;
	private direction = 1;
	private lastDeltaTime = 0;

	constructor()
	{
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.canvas.width = App.WIDTH;
		this.canvas.height = App.HEIGHT;
		this.ctx = this.canvas.getContext("2d")!;
		this.render(0);
	}

	private static generateSpline(): Spline {
		const points = Array.from({ length: this.NB_POINTS }).map(() => ({
			x: ~~(Math.random() * window.innerWidth),
			y: ~~(Math.random() * window.innerHeight),
		}));
		return (new Spline(points));
	}
	public update(delta: number)
	{
		const offset = this.spline.getNormalisedOffset(this.progression);

		if (this.keyboard.isMoving) {
			this.spline.update();
		}
		this.progression += delta * this.direction * App.SHIP_SPEED;
		if (this.progression >= this.spline.totalLength || this.progression < 0) {
			this.direction *= -1;
		}
		this.ship.position = this.spline.getSplinePoint(offset);
		this.ship.angle = this.spline.getSplineAngle(offset);
		this.spline[this.keyboard.selected].x += this.keyboard.direction.x * App.MODIFICATOR * delta;
		this.spline[this.keyboard.selected].y += this.keyboard.direction.y * App.MODIFICATOR * delta;
	}
	public render = (elapsedTime: number) =>
	{
		this.ctx.clearRect(0, 0, App.WIDTH, App.HEIGHT);
		this.update((elapsedTime - this.lastDeltaTime) / 1000);
		this.spline.draw(this.ctx);
		this.spline.drawSelected(this.ctx, this.keyboard.selected);
		this.ship.draw(this.ctx);
		this.lastDeltaTime = elapsedTime;
		requestAnimationFrame(this.render);
	}
}

document.addEventListener("DOMContentLoaded", () => new App());