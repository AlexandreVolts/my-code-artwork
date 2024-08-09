export class BinaryArray {
  // SIZE cannot be > 31 because JS cannot store 2^32 numbers
  public static readonly SIZE = 31;
  private readonly ruleset = 110;

  constructor(
    private readonly data = Math.pow(2, 15)//~~(Math.random() * (1 << (BinaryArray.SIZE - 1)))
  ) {}

  private static get(data: number, x: number, size: number) {
    return (data >> (size - 1 - x)) % 2;
  }

  /**
   * @param data The array of data from where to get the neighborhood
   * @param center
   * @returns A section of the array to the form `0bxxx` where the second `x` is the `center`.
   */
  private static getNeighborhood(data: number, center: number) {
    let output = 0;
    let tile: number;

    for (let i = center - 1; i <= center + 1; i++) {
      tile = BinaryArray.get(data, i, BinaryArray.SIZE);
      if (i === -1)
        tile = BinaryArray.get(data, BinaryArray.SIZE - 1, BinaryArray.SIZE);
      if (i === BinaryArray.SIZE)
        tile = BinaryArray.get(data, 0, BinaryArray.SIZE);
      output += tile << (center + 1 - i);
    }
    return output;
  }

  private includes(neighborhood: number) {
    return (this.ruleset >> neighborhood) % 2;
  }

  public computeNextGeneration() {
    let outputData = 0;

    for (let i = 0; i < BinaryArray.SIZE; i++) {
      outputData <<= 1;
      outputData += this.includes(BinaryArray.getNeighborhood(this.data, i));
    }
    return new BinaryArray(outputData);
  }
  public get(x: number) {
    return BinaryArray.get(this.data, x, BinaryArray.SIZE);
  }
}
