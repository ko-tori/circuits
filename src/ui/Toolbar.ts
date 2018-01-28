import { Point } from "../Common";
import { toolbarHeight, toolbarPadding } from "../Constants";

interface DragInfo {
    index: number,
    position: Point
}

export class Toolbar {
    private dragInfo: DragInfo | null = null;
    private phantom: Point = null;
    private elements = [
        "and"
    ];
    public draw(ctx: CanvasRenderingContext2D, width: number) {
        let x = toolbarPadding, y = toolbarPadding;
        let size = toolbarHeight - 2 * toolbarPadding;
        for (let element of this.elements) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(x, y, size, size);
            x += size + toolbarPadding;
        }

        // draw phantom
        if (this.phantom != null) {
            ctx.save();
            ctx.strokeStyle = "gray";
            ctx.translate(this.phantom.x, this.phantom.y);
            ctx.strokeRect(-size / 2, -size / 2, size, size);
            ctx.restore();
        }
    }
    public mousedown(evt: MouseEvent) {
        let x = evt.clientX, y = evt.clientY;
        this.dragInfo = <DragInfo>{ index: 0, position: new Point(x, y) };
    }
    public mouseup(evt: MouseEvent) {
        this.dragInfo = null;
        this.phantom = null;
    }
    public mousemove(evt: MouseEvent) {
        if (this.dragInfo != null) {
            let x = evt.clientX, y = evt.clientY;
            this.phantom = new Point(x, y);
        }
    }
}