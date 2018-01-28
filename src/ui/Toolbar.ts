import { Point, Newable } from "../Common";
import { toolbarHeight, toolbarPadding } from "../Constants";
import { Component, ANDComponent } from "../lib/Component";

interface DragInfo {
    ctor: Function,
    position: Point
}

const size = toolbarHeight - 2 * toolbarPadding;

export class Toolbar {
    private dragInfo: DragInfo | null = null;
    private phantom: Point | null = null;
    private elements = [
        { name: "and", ctor: ANDComponent, topleft: new Point(0, 0) }
    ];
    constructor() {
        let x = toolbarPadding, y = toolbarPadding;
        for (let i = 0; i < this.elements.length; ++i) {
            this.elements[i].topleft = new Point(x, y);
            x += size + toolbarPadding;
        }
    }
    public draw(ctx: CanvasRenderingContext2D, width: number) {
        let x = toolbarPadding, y = toolbarPadding;
        for (let i = 0; i < this.elements.length; ++i) {
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
        for (let i = 0; i < this.elements.length; ++i) {
            let p = this.elements[i].topleft;
            if (x >= p.x && x <= p.x + size && y >= p.y && y <= p.y + size) {
                let ctor = this.elements[i].ctor;
                this.dragInfo = <DragInfo>{ ctor: ctor, position: new Point(x, y) };
                break;
            }
        }
    }
    public mouseup(evt: MouseEvent) {
        // is the mouseup in the stage area?
        if (this.dragInfo != null) {
            let ctor = <Newable<Component>>this.dragInfo.ctor;
            let c = new ctor();
            console.log("create a component!", c);
            this.dragInfo = null;
            this.phantom = null;
        }
    }
    public mousemove(evt: MouseEvent) {
        if (this.dragInfo != null) {
            let x = evt.clientX, y = evt.clientY;
            this.phantom = new Point(x, y);
        }
    }
}