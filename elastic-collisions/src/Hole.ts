import { Ball } from "./Ball";
import { Env } from "./Env";
import { IDrawable } from "./IDrawable";

export class Hole implements IDrawable {
  private static readonly RADIUS = 11.7 * Env.SCALE;
  constructor(private readonly _x: number, private readonly _y: number) {}

  public isBallInside(ball: Ball): boolean {
    const dx = ball.x - this._x;
    const dy = ball.y - this._y;
    const distance = Math.hypot(dx, dy);

    return distance <= Hole.RADIUS;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this._x, this._y, Hole.RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  public get x() {
    return this._x;
  }
  public get y() {
    return this._y;
  }
}
