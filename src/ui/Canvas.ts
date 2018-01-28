import { topLevelComponents, componentMap } from "../Common";
import { Toolbar } from "./Toolbar";
import { toolbarHeight, libraryWidth } from "../Constants";

export class Canvas {
    private toolbar;
    constructor(public c: HTMLCanvasElement) {
        this.toolbar = new Toolbar();
    }
    public draw() {
        let ctx = this.c.getContext("2d");
        if (ctx == null) return;
        ctx.clearRect(0, 0, this.c.width, this.c.height);

        // 1. draw the toolbar
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, this.c.width, toolbarHeight);
        this.toolbar.draw(ctx, this.c.width, toolbarHeight);
        ctx.restore();

        // 2. draw the library
        ctx.save();
        ctx.strokeStyle = "black";
        let width = libraryWidth, height = this.c.height - toolbarHeight;
        ctx.translate(this.c.width - width, toolbarHeight);
        ctx.font = "15pt Arial";
        ctx.fillText("Library", 5, parseInt(ctx.font.toString()) * 1.2);
        ctx.strokeRect(0, 0, width, height);
        ctx.restore();

        // 3. draw components
        for (let guid of topLevelComponents) {
            let component = componentMap.get(guid);
            if (component == undefined) continue;
            ctx.save();
            ctx.translate(component.location.x, component.location.y);
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.arc(0, 0, 40, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
            console.log(component.absoluteInputs);
            console.log(component.absoluteOutputs);
        }
    }
    public mousedown(evt: MouseEvent) {
        this.toolbar.mousedown(evt);
        this.draw();
    }
    public mouseup(evt: MouseEvent) {
        this.toolbar.mouseup(evt);
        this.draw();
    }
    public mousemove(evt: MouseEvent) {
        this.toolbar.mousemove(evt);
        this.draw();
    }
}
