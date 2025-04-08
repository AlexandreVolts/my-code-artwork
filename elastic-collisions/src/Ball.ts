import { Table } from "./Table";
import { rand } from "./rand";

export class Ball {
  private static readonly SIZE = 5.72;
  private static readonly DEFAULT_SPEED = 150;

  public readonly mass = 1;
  private vx = rand(-Ball.DEFAULT_SPEED, Ball.DEFAULT_SPEED);
  private vy = rand(-Ball.DEFAULT_SPEED, Ball.DEFAULT_SPEED);
  private readonly radius = Ball.SIZE * Table.SCALE;

  constructor(private x: number, private y: number) {}

  public bounce(table: Table) {
    const border = Table.BORDER_THICKNESS;
    const borderWithBallRadius = this.radius + border;

    if (this.x - borderWithBallRadius <= 0 || this.x + this.radius >= table.width + border) {
      this.vx *= -1;
      this.x =
        this.x - borderWithBallRadius <= 0 ? borderWithBallRadius : table.width + border - this.radius;
    }
    if (this.y - borderWithBallRadius <= 0 || this.y + this.radius >= table.height + border) {
      this.vy *= -1;
      this.y =
        this.y - borderWithBallRadius <= 0 ? borderWithBallRadius : table.height + border - this.radius;
    }
  }

  public collide(ball: Ball) {
    let dx = ball.x - this.x;
    let dy = ball.y - this.y;
    let distance = Math.hypot(dx, dy);
    const overlap = distance - (this.radius + ball.radius);

    const totalMass = this.mass + ball.mass;
  
    const separationX = (overlap * dx) / distance / 2;
    const separationY = (overlap * dy) / distance / 2;

    if (overlap >= 0) return;
    this.x += separationX;
    this.y += separationY;
    ball.x -= separationX;
    ball.y -= separationY;

    dx = ball.x - this.x;
    dy = ball.y - this.y;
    distance = Math.hypot(dx, dy);

    const dvx = ball.vx - this.vx;
    const dvy = ball.vy - this.vy;
    const dotProduct = dvx * dx + dvy * dy;
    const den = totalMass * distance * distance;

    this.vx += (2 * ball.mass * dotProduct / den) * dx;
    this.vy += (2 * ball.mass * dotProduct / den) * dy;
    ball.vx -= (2 * this.mass * dotProduct / den) * dx;
    ball.vy -= (2 * this.mass * dotProduct / den) * dy;
  }

  public update(delta: number) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    this.vx *= Table.FRICTION;
    this.vy *= Table.FRICTION;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
