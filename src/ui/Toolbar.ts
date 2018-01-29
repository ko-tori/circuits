import { Point, Newable, componentMap, topLevelComponents } from "../Common";
import { toolbarHeight, toolbarPadding, componentSize } from "../Constants";
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
        { type: "component", name: "and", ctor: ANDComponent, topleft: new Point(0, 0) }
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
            ctx.globalAlpha = 0.6;
            ctx.strokeStyle = "black";
            ctx.translate(this.phantom.x, this.phantom.y);
            ctx.strokeRect(-componentSize, -componentSize, componentSize * 2, componentSize * 2);
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
            let at = new Point(evt.clientX, evt.clientY);
            let ctor = <Newable<Component>>this.dragInfo.ctor;
            let component = new ctor(at);
            topLevelComponents.add(component.guid);

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