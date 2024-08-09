import { Vector2 } from "./Vector2";

export class Ship {
  private static readonly SIZE = 20;
  public position: Vector2 = { x: 0, y: 0 };
  public angle = 0;

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    // TODO: Learn to rotate a shape around an angle.
    ctx.moveTo(
      this.position.x + Math.sin(this.angle) * Ship.SIZE, 
      this.position.y + Math.cos(this.angle) * Ship.SIZE,
    );
    ctx.lineTo(
      this.position.x - Math.sin(this.angle) * Ship.SIZE, 
      this.position.y - Math.cos(this.angle) * Ship.SIZE,
    );
    ctx.stroke();
  }
}