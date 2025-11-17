import { App } from "./App";
import { dirs } from "./Direction";
import { Tile } from "./Tile";

export class Grid {
  private readonly cells: Array<Tile | undefined>;
  private readonly width: number;
  private readonly height: number;
  private readonly possibilities: number[][];

  constructor(private readonly cellSize: number, tilesLen: number) {
    this.width = ~~(App.WIDTH / cellSize);
    this.height = ~~(App.HEIGHT / cellSize);
    this.cells = Array.from(
      { length: this.width * this.height },
      () => undefined
    );
    this.possibilities = Array.from({ length: this.width * this.height }, () =>
      Array.from({ length: tilesLen }).map((_, i) => i)
    );
  }

  private pickLowestEntropyPossibility(): number {
    let output = -1;
    let bestEntropy = Infinity;

    for (let i = 0; i < this.possibilities.length; i++) {
      const p = this.possibilities[i];
      if (p.length > 1 && p.length < bestEntropy) {
        bestEntropy = p.length;
        output = i;
      }
    }
    return output;
  }
  private pickRandomUncollapsedCell(): number {
    const uncollapsed = this.possibilities
      .map((p, i) => (p.length > 1 ? i : -1))
      .filter((i) => i > 1);
    if (uncollapsed.length === 0) return -1;
    return uncollapsed[~~(Math.random() * uncollapsed.length)];
  }
  private propagateConstraints(tiles: Tile[], bestIndex: number) {
    const queue: number[] = [bestIndex];
    const allIndices = tiles.map((_, i) => i);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const cx = current % this.width;
      const cy = ~~(current / this.width);
      const currentPoss = this.possibilities[current];

      for (const dir of dirs) {
        const dx = Math.round(Math.cos(dir));
        const dy = Math.round(Math.sin(dir));
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= this.width || ny >= this.height) continue;
        const index = nx + ny * this.width;

        // Compute allowed tiles for neighbor given current cell possibilities
        const allowed = new Set<number>();
        for (const tileIndex of currentPoss) {
          const allowedFromTile =
            tiles[tileIndex].getPossibleAdjacentTiles(dir);
          for (const a of allowedFromTile) allowed.add(a);
        }

        if (allowed.size === 0) {
          // Constraint cannot be satisfied: reset neighbor possibilities to all tiles
          if (this.possibilities[index].length !== allIndices.length) {
            this.possibilities[index] = [...allIndices];
            queue.push(index);
          }
          continue;
        }

        const beforeLength = this.possibilities[index].length;
        this.possibilities[index] = this.possibilities[index].filter((v) =>
          allowed.has(v)
        );

        if (this.possibilities[index].length === 0) {
          // No valid possibilities: fallback to all tiles to avoid deadlock
          this.possibilities[index] = [...allIndices];
        }

        if (this.possibilities[index].length === 1) {
          // If neighbor collapsed, set concrete tile
          this.set(nx, ny, tiles[this.possibilities[index][0]]);
        }

        if (this.possibilities[index].length < beforeLength) {
          queue.push(index);
        }
      }
    }
  }

  private get(x: number, y: number): Tile | undefined {
    return this.cells[x + y * this.width];
  }
  private set(x: number, y: number, tile: Tile) {
    this.cells[x + y * this.width] = tile;
  }

  public reduceEntropy(tiles: Tile[]) {
    const collapsedCount = this.possibilities.filter(
      (possibility) => possibility.length === 1
    );
    if (collapsedCount.length >= this.width * this.height) return;

    let bestIndex = this.pickLowestEntropyPossibility();

    if (bestIndex === -1) {
      bestIndex = this.pickRandomUncollapsedCell();
      if (bestIndex === -1) return;
    }

    const choices = this.possibilities[bestIndex];
    const chosen = choices[~~(Math.random() * choices.length)];
    this.possibilities[bestIndex] = [chosen];
    const bx = bestIndex % this.width;
    const by = ~~(bestIndex / this.width);
    this.set(bx, by, tiles[chosen]);

    this.propagateConstraints(tiles, bestIndex);
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
