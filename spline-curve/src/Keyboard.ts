import { Vector2 } from "./Vector2";

export class Keyboard {
  private readonly _direction = { x: 0, y: 0 };
  private _selected = 0;
  private _isMoving = false;

  constructor(limit: number) {
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'a') {
				this._selected--;
				if (this._selected < 0) {
					this._selected = limit - 1;
				}
			}
			if (e.key.toLowerCase() === 'z') {
				this._selected = (this._selected + 1) % limit;
			}
      this.onMovementKeyPressed(e.key, true);
		});
    window.addEventListener('keyup', (e) => this.onMovementKeyPressed(e.key, false));
  }

  private onMovementKeyPressed(key: string, isDown: boolean) {
    this._direction.x = key === 'ArrowLeft' ? (isDown ? -1 : 0) : this._direction.x;
    this._direction.x = key === 'ArrowRight' ? (isDown ? 1 : 0) : this._direction.x;
    this._direction.y = key === 'ArrowUp' ? (isDown ? -1 : 0) : this._direction.y;
    this._direction.y = key === 'ArrowDown' ? (isDown ? 1 : 0) : this._direction.y;
    this._isMoving = key === 'Space';
  }
  
  public get selected() {
    return (this._selected);
  }
  public get direction() {
    return (this._direction);
  }
  public get isMoving() {
    return (this._isMoving);
  }
}