import { Env } from "./Env";
import { Hole } from "./Hole";

export class Table {
  public readonly width = Env.SCALE * Env.TABLE_WIDTH;
  public readonly height = Env.SCALE * Env.TABLE_HEIGHT;
  private readonly holes: Hole[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.holes.push(
        ...[
          new Hole(Env.TABLE_BORDER + (this.width / 2) * i, Env.TABLE_BORDER),
          new Hole(
            Env.TABLE_BORDER + (this.width / 2) * i,
            Env.TABLE_BORDER + this.height
          ),
        ]
      );
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const PADDING = Env.TABLE_BORDER * 0.5;

    ctx.strokeStyle = "transparent";
    ctx.fillStyle = "#606c38";
    ctx.lineWidth = Env.TABLE_BORDER;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    ctx.fillRect(
      PADDING,
      PADDING,
      this.width + PADDING * 2,
      this.height + PADDING * 2
    );
    ctx.strokeRect(
      PADDING,
      PADDING,
      this.width + PADDING * 2,
      this.height + PADDING * 2
    );
    ctx.strokeStyle = "#6f1d1b";
    ctx.strokeRect(
      PADDING,
      PADDING,
      this.width + PADDING * 2,
      this.height + PADDING * 2
    );
    this.holes.forEach((hole) => hole.draw(ctx));
  }
}
