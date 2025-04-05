import { App } from "./App";
import { rand } from "./rand";

export class Circle {
  private static readonly DEFAULT_SPEED = 150;
  private static readonly MASS_MULTIPLIER = 5;

  public readonly mass = rand(1, 1);
  private _vx = rand(-Circle.DEFAULT_SPEED, Circle.DEFAULT_SPEED);
  private _vy = rand(-Circle.DEFAULT_SPEED, Circle.DEFAULT_SPEED);
  private readonly radius = Math.sqrt(this.mass) * Circle.MASS_MULTIPLIER;

  constructor(private _x: number, private _y: number) {}

  public collide(circle: Circle) {
    let dx = circle._x - this._x;
    let dy = circle._y - this._y;
    let distance = Math.hypot(dx, dy);
    const overlap = distance - (this.radius + circle.radius);

    const totalMass = this.mass + circle.mass;
  
    const separationX = (overlap * dx) / distance / 2;
    const separationY = (overlap * dy) / distance / 2;

    if (overlap >= 0) return;
    this._x += separationX;
    this._y += separationY;
    circle._x -= separationX;
    circle._y -= separationY;

    dx = circle._x - this._x;
    dy = circle._y - this._y;
    distance = Math.hypot(dx, dy);

    const dvx = circle._vx - this._vx;
    const dvy = circle._vy - this._vy;
    const dotProduct = dvx * dx + dvy * dy;
    const den = totalMass * distance * distance;

    this._vx += (2 * circle.mass * dotProduct / den) * dx;
    this._vy += (2 * circle.mass * dotProduct / den) * dy;
    circle._vx -= (2 * this.mass * dotProduct / den) * dx;
    circle._vy -= (2 * this.mass * dotProduct / den) * dy;
  }

  public update(delta: number) {
    this._x += this._vx * delta;
    this._y += this._vy * delta;
    if (this._x - this.radius <= 0 || this._x + this.radius >= App.WIDTH) {
      this._vx *= -1;
      this._x =
        this._x - this.radius <= 0 ? this.radius : App.WIDTH - this.radius;
    }
    if (this._y - this.radius <= 0 || this._y + this.radius >= App.HEIGHT) {
      this._vy *= -1;
      this._y =
        this._y - this.radius <= 0 ? this.radius : App.HEIGHT - this.radius;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this._x, this._y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
