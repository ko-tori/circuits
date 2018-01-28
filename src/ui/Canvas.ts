import { topLevelComponents } from "../Common";
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
        ctx.strokeRect(0, 0, width, height);
        ctx.restore();

        // 3. draw components
        ctx.save();
        for (let guid of topLevelComponents) {
            console.log(guid);
        }
        ctx.restore();
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
