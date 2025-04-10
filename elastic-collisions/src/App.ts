import { Ball } from "./Ball";
import { Env } from "./Env";
import { rand } from "./rand";
import { Table } from "./Table";

export class App {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private lastElapedTime = 0;

  private readonly balls: Ball[] = [];
  private readonly table = new Table();

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = this.table.width + Env.TABLE_BORDER * 2;
    this.canvas.height = this.table.height + Env.TABLE_BORDER * 2;
    this.ctx = this.canvas.getContext("2d")!;
    for (let i = 0; i < 50; i++) {
      this.balls.push(new Ball(rand(0, this.table.width), rand(0, this.table.height)));
    }
    this.render();
  }

  public update(delta: number) {
    this.balls.forEach((ball, index) => {
      ball.update(delta);
      ball.bounce(this.table);
      this.balls.slice(index).forEach((b) => ball !== b && ball.collide(b));
    });
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.table.draw(this.ctx);
    this.balls.forEach((circle) => circle.draw(this.ctx));
  }

  public render = (elapsedTime = 0) => {
    this.update((elapsedTime - this.lastElapedTime) / 1000);
    this.draw();
    this.lastElapedTime = elapsedTime;
    requestAnimationFrame(this.render);
  };
}
