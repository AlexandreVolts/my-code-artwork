import { arePixelsEquals } from "./arePixelEquals";
import { Direction } from "./Direction";

export class Tile {
  private readonly adjacents: Record<Direction, number[]>;

  constructor(
    private readonly data: number[],
    public readonly index: number,
    private readonly size: number
  ) {
    this.adjacents = {
      [Direction.LEFT]: [],
      [Direction.TOP]: [],
      [Direction.BOTTOM]: [],
      [Direction.RIGHT]: [],
    };
  }

  public static drawTileArray(
    ctx: CanvasRenderingContext2D,
    tiles: Tile[],
    tilesByRow: number,
    size: number,
    spacing = 5
  ) {
    tiles.forEach((tile, index) => {
      const x = index % tilesByRow;
      const y = ~~(index / tilesByRow);

      tile.draw(ctx, x * (size + spacing), y * (size + spacing), size);
    });
  }

  private getColor(x: number, y: number) {
    const index = (x + y * this.size) * 4;

    return `rgb(${this.data[index]}, ${this.data[index + 1]}, ${
      this.data[index + 2]
    })`;
  }

  public isOverlaping(other: Tile, dir: Direction): boolean {
    const dx = ~~Math.cos(dir);
    const dy = ~~Math.sin(dir);

    for (let i = 0; i < this.size - Math.abs(dx); i++) {
      for (let j = 0; j < this.size - Math.abs(dy); j++) {
        const thisIndex = i + (dx === 1 ? 1 : 0) + (j + (dy === 1 ? 1 : 0)) * 4;
        const otherIndex =
          i + (dx === -1 ? 1 : 0) + (j + (dy === -1 ? 1 : 0)) * 4;

        if (
          !arePixelsEquals(
            this.data.slice(thisIndex, thisIndex + 3),
            other.data.slice(otherIndex, otherIndex + 3)
          )
        ) {
          return false;
        }
      }
    }
    return true;
  }

  public addTile(direction: Direction, index: number) {
    this.adjacents[direction].push(index);
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) {
    const s = size / this.size;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        ctx.fillStyle = this.getColor(i, j);
        ctx.fillRect(x + i * s, y + j * s, s, s);
      }
    }
  }
}
