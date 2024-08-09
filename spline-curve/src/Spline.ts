import { Vector2 } from "./Vector2";

export class Spline extends Array<Vector2> {
  private static readonly PADDING = 0.01;
  private static readonly STEP_SIZE = 0.01;
  private _totalLength = 0;

  constructor(points: Vector2[]) {
    super(...points);
    this.update();
  }

  private getSegmentLength(index: number): number {
    let output = 0;
    let dx: number, dy: number;
    let old = this.getSplinePoint(~~index);
    let cur: Vector2;

    for (let i = 0; i < 1; i += Spline.STEP_SIZE) {
      cur = this.getSplinePoint(index + i);
      dx = cur.x - old.x;
      dy = cur.y - old.y;
      output += Math.sqrt(dx * dx + dy * dy);
      old = cur;
    }
    return (output);
  }
  private getTotalLength() {
    return ([...this].slice(0, -1).reduce((prev, _, index) => {
      return (prev + this.getSegmentLength(index));
    }, 0));
  }
  private drawPoint(ctx: CanvasRenderingContext2D, point: Vector2, selected = false) {
    ctx.fillStyle = selected ? 'green' : 'yellow';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  private drawLinePoint(ctx: CanvasRenderingContext2D, point: Vector2) {
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  public update() {
    this._totalLength = this.getTotalLength();
  }
  public getSplinePoint(t: number): Vector2 {
    const p1 = (~~t);
    const p2 = p1 + 1 < this.length ? p1 + 1 : p1;
    const p3 = p1 + 2 < this.length ? p1 + 2 : p2;
    const p0 = p1 - 1 >= 0 ? p1 - 1 : 0;
    const remainT = t - (~~t);
    const squareT = remainT * remainT;
    const cubicT = remainT * remainT * remainT;
    const q1 = -cubicT + 2 * squareT - remainT;
    const q2 = 3 * cubicT - 5 * squareT + 2;
    const q3 = -3 * cubicT + 4 * squareT + remainT;
    const q4 = cubicT - squareT;
    const tx = this[p0].x * q1 + this[p1].x * q2 + this[p2].x * q3 + this[p3].x * q4;
    const ty = this[p0].y * q1 + this[p1].y * q2 + this[p2].y * q3 + this[p3].y * q4;

    return { x: tx * 0.5, y: ty * 0.5 };
  }
  public getSplineAngle(t: number): number {
    const p1 = (~~t);
    const p2 = p1 + 1 < this.length ? p1 + 1 : p1;
    const p3 = p1 + 2 < this.length ? p1 + 2 : p2;
    const p0 = p1 - 1 >= 0 ? p1 - 1 : 0;
    const remainT = t - (~~t);
    const squareT = remainT * remainT;
    const q1 = -3 * squareT + 4 * remainT - 1;
    const q2 = 9 * squareT - 10 * remainT;
    const q3 = -9 * squareT + 8 * remainT + 1;
    const q4 = 3 * squareT - 2 * remainT;
    const tx = this[p0].x * q1 + this[p1].x * q2 + this[p2].x * q3 + this[p3].x * q4;
    const ty = this[p0].y * q1 + this[p1].y * q2 + this[p2].y * q3 + this[p3].y * q4;

    return Math.atan2(-ty * 0.5, tx * 0.5);
  }
  public getNormalisedOffset(p: number) {
    let len = p;
    let i = 0;
    let cur = this.getSegmentLength(0);

    for (; i < this.length - 1 && len > cur; i++, cur = this.getSegmentLength(i)) {
      len -= cur;
    }
    return (i + len / cur);
  }
  public drawSelected(ctx: CanvasRenderingContext2D, index: number) {
    this.drawPoint(ctx, this[index], true);
  }
  public draw(ctx: CanvasRenderingContext2D) {
    for (let t = 0; t < this.length - 1; t += Spline.PADDING) {
      this.drawLinePoint(ctx, this.getSplinePoint(t));
    }
    this.forEach((point) => this.drawPoint(ctx, point, false));
  }

  public get totalLength() {
    return (this._totalLength);
  }
}