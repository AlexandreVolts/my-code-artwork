import { Env } from "./Env";
import { IDrawable } from "./IDrawable";
import { Table } from "./Table";
import { rand } from "./rand";

export class Ball implements IDrawable {
  private static readonly RADIUS = 5.72 * Env.SCALE;
  private static readonly DEFAULT_SPEED = 150;

  public readonly mass = 1;
  private vx = rand(-Ball.DEFAULT_SPEED, Ball.DEFAULT_SPEED);
  private vy = rand(-Ball.DEFAULT_SPEED, Ball.DEFAULT_SPEED);
  private isPocket = false;

  constructor(private _x: number, private _y: number) {}

  public bounce(table: Table) {
    const border = Env.TABLE_BORDER;
    const borderWithBallRadius = Ball.RADIUS + border;

    if (this._x - borderWithBallRadius <= 0) {
      this.vx *= -1;
      this._x = borderWithBallRadius;
    }
    if (this._x + Ball.RADIUS >= table.width + border) {
      this.vx *= -1;
      this._x = table.width + border - Ball.RADIUS;
    }
    if (this._y - borderWithBallRadius <= 0) {
      this.vy *= -1;
      this._y = borderWithBallRadius;
    }
    if (this._y + Ball.RADIUS >= table.height + border) {
      this.vy *= -1;
      this._y = table.height + border - Ball.RADIUS;
    }
  }

  public collide(ball: Ball) {
    let dx = ball._x - this._x;
    let dy = ball._y - this._y;
    let distance = Math.hypot(dx, dy);
    const overlap = distance - (Ball.RADIUS + Ball.RADIUS);

    const totalMass = this.mass + ball.mass;

    const separationX = (overlap * dx) / distance / 2;
    const separationY = (overlap * dy) / distance / 2;

    if (overlap >= 0) return;
    this._x += separationX;
    this._y += separationY;
    ball._x -= separationX;
    ball._y -= separationY;

    dx = ball._x - this._x;
    dy = ball._y - this._y;
    distance = Math.hypot(dx, dy);

    const dvx = ball.vx - this.vx;
    const dvy = ball.vy - this.vy;
    const dotProduct = dvx * dx + dvy * dy;
    const den = totalMass * distance * distance;

    this.vx += ((2 * ball.mass * dotProduct) / den) * dx;
    this.vy += ((2 * ball.mass * dotProduct) / den) * dy;
    ball.vx -= ((2 * this.mass * dotProduct) / den) * dx;
    ball.vy -= ((2 * this.mass * dotProduct) / den) * dy;
  }

  public kill() {
    this.isPocket = true;
  }

  public update(delta: number) {
    this._x += this.vx * delta;
    this._y += this.vy * delta;
    this.vx *= Env.FRICTION;
    this.vy *= Env.FRICTION;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this._x, this._y, Ball.RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  public get x() {
    return this._x;
  }
  public get y() {
    return this._y;
  }
}
