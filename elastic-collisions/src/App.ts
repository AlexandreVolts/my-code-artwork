import { Circle } from "./Circle";
import { rand } from "./rand";

export class App {
  public static readonly WIDTH = 800 * (9 / 16);
  public static readonly HEIGHT = 800;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private lastElapedTime = 0;

  private readonly circles: Circle[] = [];

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = App.WIDTH;
    this.canvas.height = App.HEIGHT;
    this.ctx = this.canvas.getContext("2d")!;
    for (let i = 0; i < 1000; i++) {
      this.circles.push(new Circle(rand(0, App.WIDTH), rand(0, App.HEIGHT)));
    }
    this.render();
  }

  public update(delta: number) {
    this.circles.forEach((c1, index) => {
      c1.update(delta);
      this.circles.slice(index).forEach((c2) => c1 !== c2 && c1.collide(c2));
    });
  }

  public draw() {
    this.ctx.clearRect(0, 0, App.WIDTH, App.HEIGHT);
    this.circles.forEach((circle) => circle.draw(this.ctx));
  }

  public render = (elapsedTime = 0) => {
    this.update((elapsedTime - this.lastElapedTime) / 1000);
    this.draw();
    this.lastElapedTime = elapsedTime;
    requestAnimationFrame(this.render);
  };
}
