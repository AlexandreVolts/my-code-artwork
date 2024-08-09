import { Circle } from "./Circle";
import { generateApplonianGasketFractal } from "./generateAppolonianGasketFractal";
import { generateInitialCircles } from "./generateInitialCircle";

export class App {
  private static readonly SIZE = 800;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  private readonly circles = generateApplonianGasketFractal(
    ...generateInitialCircles(
      new Circle(App.SIZE / 2, App.SIZE / 2, -1 / (App.SIZE / 2))
    ),
    2
  );

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = App.SIZE;
    this.canvas.height = App.SIZE;
    this.ctx = this.canvas.getContext("2d")!;
    this.circles.forEach((circle) => circle.draw(this.ctx));
  }
}
