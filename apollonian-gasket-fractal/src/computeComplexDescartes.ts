import { Circle } from "./Circle";
import { computeDescartes } from "./computeDescartes";

/**
 * c4 is obtained through: `c4 = (zk1 + zk2 + zk3 ± 2 * sqrt(zk1 * zk2 + zk2 * zk3 + zk1 * zk3)) / k4`
 * where zk is the scale of z by k.
 */
export function computeComplexDescartes(c1: Circle, c2: Circle, c3: Circle) {
  const k4 = computeDescartes(c1.k, c2.k, c3.k);
  const sum = c1.zk.add(c2.zk).add(c3.zk);
  const root = c1.zk
    .mul(c2.zk)
    .add(c2.zk.mul(c3.zk))
    .add(c3.zk.mul(c1.zk))
    .sqrt()
    .scale(2);

  return [
    sum.add(root).scale(1 / k4[0]),
    sum.sub(root).scale(1 / k4[0]),
    sum.add(root).scale(1 / k4[1]),
    sum.sub(root).scale(1 / k4[1]),
  ];
}
