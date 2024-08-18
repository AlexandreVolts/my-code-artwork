import { InkDropArray } from "./InkDropArray";

export class App {
  public static readonly SIZE = 800;
  private static readonly DROPS = 200;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private drops = new InkDropArray();

  private mouseDown = false;

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = App.SIZE;
    this.canvas.height = App.SIZE;
    this.ctx = this.canvas.getContext("2d")!;

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.drops.reset();
        return;
      }
      this.drops.drop(
        Math.random() * App.SIZE,
        Math.random() * App.SIZE,
        Math.random() * 50 + 25
      );
      this.drops.purge();
    });
    window.addEventListener("mousedown", () => (this.mouseDown = true));
    window.addEventListener("mouseup", () => (this.mouseDown = false));
    window.addEventListener("mousemove", (e) => {
      if (!this.mouseDown) return;
      const angle = Math.atan2(e.movementY, e.movementX);
      const start = {
        x: e.clientX - this.canvas.getBoundingClientRect().left,
        y: e.clientY - this.canvas.getBoundingClientRect().top,
      };
      this.drops.tine(angle, start, 2, 10);
    });
    this.render();
  }

  public draw() {
    this.ctx.clearRect(0, 0, App.SIZE, App.SIZE);
    this.drops.draw(this.ctx);
  }

  public render = () => {
    this.draw();
    requestAnimationFrame(this.render);
  };
}
