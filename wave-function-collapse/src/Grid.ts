import { App } from "./App";
import { dirs } from "./Direction";
import { Tile } from "./Tile";

export class Grid {
  private readonly cells: Tile[] = [];
  private readonly width: number;
  private readonly height: number;

  constructor(private readonly cellSize: number) {
    this.width = ~~(App.WIDTH / cellSize);
    this.height = ~~(App.HEIGHT / cellSize);
  }

  private get(x: number, y: number): Tile {
    return this.cells[x + y * this.width];
  }

  public set(x: number, y: number, tile: Tile) {
    this.cells[x + y * this.width] = tile;
  }

  public reduceEntropy(tiles: Tile[]) {
    const filledCellsIndex = this.cells
      .map((_, index) => index)
      .filter((index) => this.cells[index]);

    if (filledCellsIndex.length >= this.width * this.height) return;

    for (const index of filledCellsIndex) {
      for (const dir of dirs) {
        const x = ~~((index % this.width) + Math.cos(dir));
        const y = ~~((index / this.width) + Math.sin(dir));

        if (
          this.get(x, y) ||
          x < 0 ||
          y < 0 ||
          x >= this.width ||
          y >= this.height
        )
          continue;
        const possibleAdjacentTile =
          this.cells[index].getPossibleAdjacentTiles(dir);
        const tileIndex =
          possibleAdjacentTile[~~(Math.random() * possibleAdjacentTile.length)];
        this.set(x, y, tiles[tileIndex]);
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.get(x, y)?.drawCenterPixel(
          ctx,
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize
        );
      }
    }
  }
}
