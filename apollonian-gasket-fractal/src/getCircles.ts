import { Circle } from "./Circle";
import { computeComplexDescartes } from "./computeComplexDescartes";
import { computeDescartes } from "./computeDescartes";

export function getCircles(c1: Circle, c2: Circle, c3: Circle): Circle[] {
  const centers = computeComplexDescartes(c1, c2, c3);
  const k4 = computeDescartes(c1.k, c2.k, c3.k);

  return centers.map(
    (center, index) =>
      new Circle(center.real, center.imaginary, k4[~~(index / 2)])
  );
}
