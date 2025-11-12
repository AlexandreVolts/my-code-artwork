import { ImageDataset } from "./ImageDataset";
import { Tile } from "./Tile";

export class App
{
	public static readonly WIDTH = window.innerWidth;
	public static readonly HEIGHT = window.innerHeight;
	private readonly canvas: HTMLCanvasElement;
	private readonly ctx: CanvasRenderingContext2D;
	private readonly image: ImageDataset;
	private lastDeltaTime = 0;

	constructor()
	{
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.canvas.width = App.WIDTH;
		this.canvas.height = App.HEIGHT;
		this.ctx = this.canvas.getContext("2d")!;
		this.image = new ImageDataset(this.ctx, document.getElementById("sample") as HTMLImageElement, 9, 9);
		this.render(0);
	}

	public update(delta: number)
	{

	}
	public render = (elapsedTime: number) =>
	{
		this.update((elapsedTime - this.lastDeltaTime) / 1000);
		this.lastDeltaTime = elapsedTime;
		
		const tiles = this.image.extractTiles(3);

		console.log(tiles);
		Tile.drawTileArray(this.ctx, tiles, 9, 75);

		//requestAnimationFrame(this.render);
	}
}

document.addEventListener("DOMContentLoaded", () => new App());