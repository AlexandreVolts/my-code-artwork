import { Pixel } from "./Pixel";

export function arePixelsEquals(a: Pixel, b: Pixel) {
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}