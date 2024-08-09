import { ComplexNumber } from "./ComplexNumber";

export class Circle {
  private static readonly EPSILON = 0.1;
  private readonly center: ComplexNumber;

  constructor(x: number, y: number, public readonly k: number) {
    this.center = new ComplexNumber(x, y);
  }

  private isTan(other: Circle) {
    const x = other.x - this.x;
    const y = other.y - this.y;
    const d = Math.sqrt(x * x + y * y);

    return (
      d - (this.r + other.r) < Circle.EPSILON ||
      d - Math.abs(other.r - this.r) < Circle.EPSILON
    );
  }

  public isTangent(circles: Circle[]) {
    return (circles.every((circle) => this.isTan(circle)));
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
  }

  public get x() {
    return this.center.real;
  }
  public get y() {
    return this.center.imaginary;
  }
  public get r() {
    return Math.abs(1 / this.k);
  }
  public get zk() {
    return this.center.scale(this.k);
  }
}
