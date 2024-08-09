import { App } from "./App";
import { Vector2 } from "./Vector2";

export class FlowFieldEffect
{
    private static readonly CELL_SIZE = 20;
    private static readonly LINE_LENGTH = 20;
    private radius = 0;

    private static drawLine(ctx:CanvasRenderingContext2D, pos:Vector2, angle:number)
    {
        const LL = FlowFieldEffect.LINE_LENGTH;
        
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + Math.cos(angle) * LL, pos.y + Math.sin(angle) * LL);
        ctx.stroke();
    }
    public update(delta:number)
    {
        this.radius += delta;
    }
    public draw(ctx:CanvasRenderingContext2D)
    {
        const CS = FlowFieldEffect.CELL_SIZE;
        const LL = FlowFieldEffect.LINE_LENGTH;
        let angle:number;
        let pos:Vector2;
        
        for (let i = 0; i < App.WIDTH; i += CS) {
            for (let j = 0; j < App.HEIGHT; j += CS) {
                angle = (Math.cos(i * 0.005) + Math.sin(j * 0.005));
                pos = {x: i + Math.cos(angle) * 10, y: j + Math.sin(angle) * 10};
                ctx.strokeStyle = `hsl(${angle * 180 / Math.PI}, 100%, 50%)`;
                FlowFieldEffect.drawLine(ctx, pos, angle * this.radius);
            }
        }
    }
}