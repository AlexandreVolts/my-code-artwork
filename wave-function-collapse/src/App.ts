import { Grid } from "./Grid";
import { ImageDataset } from "./ImageDataset";
import { Tile } from "./Tile";

export class App {
  public static readonly WIDTH = window.innerWidth;
  public static readonly HEIGHT = window.innerHeight;
  private static readonly CELL_SIZE = 10;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private grid?: Grid;
  private tiles: Tile[] = [];
  private lastDeltaTime = 0;

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
    );
    this.tiles = image.extractTiles(3);
    this.grid = new Grid(App.CELL_SIZE, this.tiles.length);
  }

  public update(_delta: number) {
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
