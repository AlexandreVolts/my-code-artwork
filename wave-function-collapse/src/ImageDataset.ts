import { App } from "./App";
import { Direction, dirs } from "./Direction";
import { Tile } from "./Tile";

export class ImageDataset {
  private readonly data: Readonly<ImageData>;

  constructor(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    width: number,
    height: number
  ) {
    ctx.drawImage(img, 0, 0);
    this.data = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, App.WIDTH, App.HEIGHT);
  }

  private static getColor(data: Readonly<ImageData>, x: number, y: number) {
    const index = (x + y * data.width) * 4;

    return `rgb(${data.data[index]}, ${data.data[index + 1]}, ${
      data.data[index + 2]
    })`;
  }

  private static extractTile(
    data: Readonly<ImageData>,
    x: number,
    y: number,
    tileIndex: number,
    tileSize: number
  ): Tile {
    const pixels: number[] = [];

    for (let i = x; i < x + tileSize; i++) {
      for (let j = y; j < y + tileSize; j++) {
        const dx = i % data.width;
        const dy = j % data.height;
        const index = (dx + dy * data.width) * 4;

        pixels.push(...data.data.slice(index, index + 4));
      }
    }
    return new Tile(pixels, tileIndex, tileSize);
  }

  public extractTiles(tileSize: number): Tile[] {
    const output: Tile[] = [];

    for (let i = 0; i < this.data.width; i++) {
      for (let j = 0; j < this.data.height; j++) {
        output.push(
          ImageDataset.extractTile(this.data, i, j, output.length, tileSize)
        );
      }
    }

    for (const dir of dirs) {
      for (let t1 of output) {
        for (let t2 of output) {
          if (t1.isOverlaping(t2, dir)) {
            t1.addTile(dir, t2.index);
          }
        }
      }
    }
    return output;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) {
    for (let i = 0; i < this.data.width; i++) {
      for (let j = 0; j < this.data.height; j++) {
        ctx.fillStyle = ImageDataset.getColor(this.data, i, j);
        ctx.fillRect(x + i * size, y + j * size, size, size);
      }
    }
  }
}
