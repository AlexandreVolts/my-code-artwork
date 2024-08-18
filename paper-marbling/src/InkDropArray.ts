import { InkDrop } from "./InkDrop";
import { Vector } from "./Vector";

export class InkDropArray {
  private drops: InkDrop[] = [];

  public drop(x: number, y: number, radius = 50) {
    const newDrop = new InkDrop(x, y, Math.abs(radius));
    this.drops.forEach((drop) => drop.marble(newDrop));
    this.drops.push(newDrop);
  }
  public tine(m: number, b: Vector, z: number, c: number) {
    this.drops.forEach((drop) => drop.tine(m, b, z, c));
  }
  public purge() {
    this.drops = this.drops.filter((drop) => !drop.isDead);
  }
  public draw(ctx: CanvasRenderingContext2D) {
    this.drops.forEach((drop) => drop.draw(ctx));
  }
  public reset() {
    this.drops = [];
  }
}
