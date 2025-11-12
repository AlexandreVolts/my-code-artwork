import { Pixel } from "./Pixel";

export function arePixelsEquals(a: Pixel, b: Pixel, tolerance = 0) {
  for (let i = 0; i < 4; i++) {
    if (Math.abs(a[i] - b[i]) > tolerance) return false;
  }
  return true;
}