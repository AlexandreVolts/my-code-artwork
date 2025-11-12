import { Grid } from "./Grid";
import { ImageDataset } from "./ImageDataset";
import { Tile } from "./Tile";

export class App {
  public static readonly WIDTH = window.innerWidth;
  public static readonly HEIGHT = window.innerHeight;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly grid: Grid = new Grid(25);
  private tiles: Tile[] = [];
  private lastDeltaTime = 0;
  private elapsedTime = 0;

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = App.WIDTH;
    this.canvas.height = App.HEIGHT;
    this.ctx = this.canvas.getContext("2d")!;
    this.init();
    this.render(0);
  }

  private init() {
    const image = new ImageDataset(
      this.ctx,
      document.getElementById("sample") as HTMLImageElement,
      9,
      9
    );
    this.tiles = image.extractTiles(3);
    this.grid?.set(0, 0, this.tiles[~~(Math.random() * this.tiles.length)]);
  }

  public update(delta: number) {
    this.elapsedTime += delta;
    if (this.elapsedTime < 0.2) return;
    this.elapsedTime = 0;

    this.grid?.reduceEntropy(this.tiles);
  }
  public render = (elapsedTime: number) => {
    this.update((elapsedTime - this.lastDeltaTime) / 1000);
    this.lastDeltaTime = elapsedTime;
    this.grid?.draw(this.ctx);

    requestAnimationFrame(this.render);
  };
}

document.addEventListener("DOMContentLoaded", () => new App());
