export interface IDrawable {
  get x(): number;
  get y(): number;
  draw(ctx: CanvasRenderingContext2D): void;
}