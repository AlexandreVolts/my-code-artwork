import { Circle } from "./Circle";
import { getCircles } from "./getCircles";

export function generateApplonianGasketFractal(
  c1: Circle,
  c2: Circle,
  c3: Circle,
  radius: number
): Circle[] {
  const output: Circle[] = [c1, c2, c3];
  const subCircles = getCircles(c1, c2, c3)
    .filter((circle) => circle.isTangent(output))
    .filter(
      (circle) => circle.r > radius && output.every((c) => c.r > circle.r)
    );
  for (const circle of subCircles) {
    output.push(...generateApplonianGasketFractal(c1, c2, circle, radius));
    output.push(...generateApplonianGasketFractal(c1, c3, circle, radius));
    output.push(...generateApplonianGasketFractal(c2, c3, circle, radius));
  }
  return output.filter((c1, index) => {
    const findIndex = output.findIndex(
      (c2) =>
        c2.x > c1.x - radius &&
        c2.x < c1.x + radius &&
        c2.y > c1.y - radius &&
        c2.y < c1.y + radius
    );

    return index === findIndex;
  });
}
