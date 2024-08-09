export class DesertWorld extends Array<number> {
  constructor(private readonly size: number) {
    super(size * size);
    this.fill(0);
  }

  private get = (x: number, y: number) => this[y * this.size + x];

  private fall = (x: number, y: number) => {
    const current = this.get(x, y);
    const isFreeBelow = !this.get(x, y + 1);
    const isFreeBelowLeft = x > 0 && !this.get(x - 1, y + 1);
    const isFreeBelowRight = x < this.size - 1 && !this.get(x + 1, y + 1);

    if (y >= this.size - 1) return;
    if (!isFreeBelow) {
      if (isFreeBelowLeft) this.set(x - 1, y + 1, current);
      else if (isFreeBelowRight) this.set(x + 1, y + 1, current);
      else return;
    } else this.set(x, y + 1, current);
    this.set(x, y, 0);
  };
  private getAllGrainsPosition = () => {
    const output: { x: number; y: number }[] = [];

    this.iterate((item, x, y) => item && output.push({ x, y }));
    return output;
  };

  public iterate(callback: (item: number, x: number, y: number) => void) {
    this.forEach((item, index) =>
      callback(item, index % this.size, ~~(index / this.size))
    );
  }
  public update = () =>
    this.getAllGrainsPosition().forEach((pos) => this.fall(pos.x, pos.y));

  public set = (x: number, y: number, value: number) =>
    (this[y * this.size + x] = value);
}
