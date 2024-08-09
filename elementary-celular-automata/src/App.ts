import { BinaryArray } from "./BinaryArray";

export class App {
  private static readonly SIZE = 800;
  private static readonly DELAY = 0.1;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly array = [new BinaryArray()];

  private lastDeltaTime = 0;
  private current = 0;

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = App.SIZE;
    this.canvas.height = App.SIZE;
    this.ctx = this.canvas.getContext("2d")!;

    this.render(0);
  }

  public update(delta: number) {
    this.current += delta;
    if (this.current >= App.DELAY && this.array.length < BinaryArray.SIZE) {
      this.current = 0;
      this.array.push(this.array[this.array.length - 1].computeNextGeneration());
    }
  }

  public draw() {
    const TILE_SIZE = App.SIZE / BinaryArray.SIZE;

    for (let i = 0, len = this.array.length; i < len; i++) {
      for (let j = BinaryArray.SIZE - 1; j >= 0; j--) {
        this.ctx.strokeRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        if (this.array[i].get(j)) {
          this.ctx.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }

  public render = (elapsedTime: number) => {
    this.update((elapsedTime - this.lastDeltaTime) / 1000);
    this.draw();
    this.lastDeltaTime = elapsedTime;
    requestAnimationFrame(this.render);
  };
}
