import { FlowFieldEffect } from "./FlowFieldEffect";

export class App
{
	public static readonly WIDTH = window.innerWidth;
	public static readonly HEIGHT = window.innerHeight;
	private lastDeltaTime = 0;
	private canvas:HTMLCanvasElement;
	private ctx:CanvasRenderingContext2D;
	private ffe = new FlowFieldEffect();

	constructor()
	{
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.canvas.width = App.WIDTH;
		this.canvas.height = App.HEIGHT;
		this.ctx = this.canvas.getContext("2d")!;
		this.ctx.strokeStyle = "white";
		this.ctx.lineWidth = 3;
		this.render(0);
	}
	public update(delta:number)
	{
		this.ffe.update(delta / 1000);
	}
	public render = (elapsedTime:number) =>
	{
		this.ctx.clearRect(0, 0, App.WIDTH, App.HEIGHT);
		this.update(elapsedTime - this.lastDeltaTime);
		this.ffe.draw(this.ctx);
		this.lastDeltaTime = elapsedTime;
		requestAnimationFrame(this.render);
	}
}

document.addEventListener("DOMContentLoaded", () => new App());