export enum Direction {
  RIGHT = 0,
  BOTTOM = Math.PI / 2,
  LEFT = Math.PI,
  TOP = Math.PI + Math.PI / 2,
}

export const dirs = Object.values(Direction).filter(
  (dir) => typeof dir === "number"
);
