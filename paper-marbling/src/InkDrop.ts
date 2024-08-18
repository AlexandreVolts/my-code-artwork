import { App } from "./App";
import { Vector } from "./Vector";

export class InkDrop {
  private static readonly VERTICES = 200;
  private readonly vertices: Vector[] = [];
  private readonly position: Vector;
  private readonly color = ~~(Math.random() * 220);

  constructor(x: number, y: number, public readonly r: number) {
    this.position = { x, y };
    for (let i = 0; i < InkDrop.VERTICES; i++) {
      const angle = ((Math.PI * 2) / InkDrop.VERTICES) * i;
      this.vertices.push({
        x: this.position.x + Math.cos(angle) * this.r,
        y: this.position.y + Math.sin(angle) * this.r,
      });
    }
  }

  /**
   * Marbling is processed on each vertice with: `C + (P - C) * sqrt(1 + (r^2 / (|P - C|^2)))`
   *
   * Where:
   *
   * C = a vector representing the center of the other drop
   *
   * P = a vector representing the vertice
   *
   * r = the radius of the otehr drop
   */
  private static marbleVertice(vertice: Vector, other: InkDrop): Vector {
    const distance = { x: vertice.x - other.x, y: vertice.y - other.y };
    const magnitude = Math.sqrt(
      distance.x * distance.x + distance.y * distance.y
    );
    const root = Math.sqrt(1 + (other.r * other.r) / (magnitude * magnitude));

    return {
      x: other.x + distance.x * root,
      y: other.y + distance.y * root,
    };
  }

  public marble(other: InkDrop) {
    this.vertices.forEach((vertice) => {
      const newVertice = InkDrop.marbleVertice(vertice, other);

      vertice.x = newVertice.x;
      vertice.y = newVertice.y;
    });
  }

  /**
   * The tine is a straight line passing by the `m` direction. It is computed with `p = P + z * u^d * M`
   *
   * Where:
   * 
   * P = a vertice of the drop
   * 
   * `u = 1 / 2^(1 / c)`
   * 
   * `d = |(P - b) . N|`
   * 
   * N = the normalization of P
   *
   * @param a The direction of the line
   * @param z The strength of the line
   * @param c The wideness of the line
   */
  public tine(m: number, b: Vector, z: number, c: number) {
    const u = 1 / Math.pow(2, 1 / c);
    const normalAngle = m + Math.PI / 2;

    this.vertices.forEach((vertice) => {
      const sub = {
        x: vertice.x - b.x,
        y: vertice.y - b.y,
      };
      const d = Math.abs(sub.x * Math.cos(normalAngle) + sub.y * Math.sin(normalAngle));
      const magnitude = z * Math.pow(u, d);

      vertice.x += Math.cos(m) * magnitude;
      vertice.y += Math.sin(m) * magnitude;
    });
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color})`;
    ctx.beginPath();
    this.vertices.forEach((vertice, index) => {
      if (index === 0) {
        ctx.moveTo(vertice.x, vertice.y);
        return;
      }
      ctx.lineTo(vertice.x, vertice.y);
    }),
      ctx.fill();
  }

  private get x() {
    return this.position.x;
  }
  private get y() {
    return this.position.y;
  }
  public get isDead() {
    return this.vertices.every((vertice) => {
      return (
        vertice.x < 0 ||
        vertice.y < 0 ||
        vertice.x > App.SIZE ||
        vertice.y > App.SIZE
      );
    });
  }
}
