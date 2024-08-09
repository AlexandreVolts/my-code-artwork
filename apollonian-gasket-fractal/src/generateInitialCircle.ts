import { Circle } from "./Circle";

export function generateInitialCircles(
  externalCircle: Circle
): [Circle, Circle, Circle] {
  const MAX_RADIUS_RATIO = 0.75;
  const angle = Math.random() * Math.PI * 2;
  const radius = externalCircle.r;
  const r1 = ~~(Math.random() * radius * MAX_RADIUS_RATIO);
  const r2 = radius - r1;

  return [
    externalCircle,
    new Circle(
      externalCircle.x + (radius - r1) * Math.cos(angle),
      externalCircle.y + (radius - r1) * Math.sin(angle),
      1 / r1
    ),
    new Circle(
      externalCircle.x - (radius - r2) * Math.cos(angle),
      externalCircle.y - (radius - r2) * Math.sin(angle),
      1 / r2
    ),
  ];
}
