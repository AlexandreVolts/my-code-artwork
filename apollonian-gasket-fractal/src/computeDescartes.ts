/**
 * "The sum of the sqaure of all four bends" `(k1**2 + k2**2 + k3**2 + k4**2)`
 * 
 * "Is half the square of their sum" `(k1 + k2 + k3 + k4)**2 * (1 / 2)`
 * 
 * k4 is obtained through: `k4 = k1 + k2 + k3 ± sqrt(k1 * k2 + k2 * k3 + k1 * k3)`
 */
export function computeDescartes(k1: number, k2: number, k3: number) {
  const sum = k1 + k2 + k3;
  const root = 2 * (Math.sqrt(Math.abs(k1 * k2 + k2 * k3 + k1 * k3)));

  return [sum + root, sum - root];
}