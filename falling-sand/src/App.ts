import { DesertWorld } from "./DesertWorld";

export class App {
  private static readonly SIZE = 800;
  private static readonly GRID_SIZE = 200;
  private static readonly TILE_SIZE = App.SIZE / App.GRID_SIZE;
  private static readonly MOUSE_BOXSIZE = 1;
  private static readonly COLOR_CHANGE_SPEED = 10;
  private static readonly DELAY = 0.01;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly world = new DesertWorld(App.GRID_SIZE);

  private lastDeltaTime = 0;
  private current = 0;
  private isMouseDown = false;
  private colorAngle = 0;

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = App.SIZE;
    this.canvas.height = App.SIZE;
    this.ctx = this.canvas.getContext("2d")!;

    this.canvas.addEventListener("mousedown", () => (this.isMouseDown = true));
    this.canvas.addEventListener("mouseup", () => (this.isMouseDown = false));
    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.isMouseDown) return;

      for (let i = -App.MOUSE_BOXSIZE; i <= App.MOUSE_BOXSIZE; i++) {
        for (let j = -App.MOUSE_BOXSIZE; j <= App.MOUSE_BOXSIZE; j++) {
          this.world.set(
            ~~(e.offsetX / App.TILE_SIZE) + i,
            ~~(e.offsetY / App.TILE_SIZE) + j,
            this.colorAngle
          );
        }
      }
    });

    this.render(0);
  }

  public update(delta: number) {
    this.colorAngle = (this.colorAngle + delta * App.COLOR_CHANGE_SPEED) % 360;
    this.current += delta;
    if (this.current < App.DELAY) return;
    this.current = 0;
    this.world.update();
  }

  public draw() {
    this.ctx.clearRect(0, 0, App.SIZE, App.SIZE);

    this.world.iterate((item, x, y) => {
      if (!item) return;
      this.ctx.fillStyle = `hsl(${item}deg, 100%, 50%)`;
      this.ctx.fillRect(
        x * App.TILE_SIZE,
        y * App.TILE_SIZE,
        App.TILE_SIZE,
        App.TILE_SIZE
      );
    });
  }

  public render = (elapsedTime: number) => {
    this.update((elapsedTime - this.lastDeltaTime) / 1000);
    this.draw();
    this.lastDeltaTime = elapsedTime;
    requestAnimationFrame(this.render);
  };
}
