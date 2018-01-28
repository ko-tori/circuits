import { Point } from "../Common";

const toolbarPadding = 10;

interface DragInfo {
    index: number,
    position: Point
}

export class Toolbar {
    private dragInfo: DragInfo | null = null;
    private elements = [
        "and"
    ];
    public draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let x = toolbarPadding, y = toolbarPadding;
        let size = height - 2 * toolbarPadding;
        for (let element of this.elements) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(x, y, size, size);
            x += size + toolbarPadding;
        }
    }
    public mousedown(evt: MouseEvent) {
        let x = evt.clientX, y = evt.clientY;
        this.dragInfo = <DragInfo>{ index: 0, position: new Point(x, y) };
    }
    public mouseup(evt: MouseEvent) {
        this.dragInfo = null;
    }
    public mousemove(evt: MouseEvent) {
        if (this.dragInfo != null) {
            let x = evt.clientX, y = evt.clientY;
            let mousePosition = new Point(x, y);
            console.log(mousePosition.sub(this.dragInfo.position));
        }
    }
}