export let canvas = <HTMLCanvasElement>document.getElementById("canvas");
export let ctx = canvas.getContext("2d");

export const toolbarHeight = 75;
export const libraryWidth = 280;

export function Draw() {
    // 1. draw the toolbar
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, toolbarHeight);
    ctx.restore();

    // 2. draw the library
    ctx.save();
    ctx.strokeStyle = "black";
    let width = libraryWidth, height = canvas.height - toolbarHeight;
    ctx.translate(canvas.width - width, toolbarHeight);
    ctx.strokeRect(0, 0, width, height);
    ctx.restore();

    // 3. draw components
}

export function MouseMove(evt: MouseEvent) {
}