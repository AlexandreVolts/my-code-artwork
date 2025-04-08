import { Ball } from "./Ball";

export class Table {
  private static readonly SIZE = 1000;
  private static readonly RELATIVE_WIDTH = 280;
  private static readonly RELATIVE_HEIGHT = 152;
  public static readonly SCALE = Table.SIZE / Table.RELATIVE_WIDTH;
  public static readonly FRICTION = 1;
  public static readonly BORDER_THICKNESS = 15 * Table.SCALE;
  public readonly width = Table.SCALE * Table.RELATIVE_WIDTH;
  public readonly height = Table.SCALE * Table.RELATIVE_HEIGHT;

  public draw(ctx: CanvasRenderingContext2D) {
    const PADDING = Table.BORDER_THICKNESS * 0.5;

    ctx.strokeStyle = "brown";
    ctx.lineWidth = Table.BORDER_THICKNESS;
    ctx.strokeRect(PADDING, PADDING, this.width + PADDING * 2, this.height + PADDING * 2);
  }
}