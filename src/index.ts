import { Library } from "./lib/Library";
import { Component } from "./lib/Component";

import { Canvas } from "./ui/Canvas";

export let canvas = new Canvas(<HTMLCanvasElement>document.getElementById("canvas"));

const resizeHandler = function (evt) {
    let target = <Window>evt.target;
    canvas.c.width = target.innerWidth;
    canvas.c.height = target.innerHeight;
    canvas.draw();
}

export function main() {
    canvas.c.width = window.innerWidth;
    canvas.c.height = window.innerHeight;

    canvas.c.focus();
    canvas.c.addEventListener("mousedown", evt => canvas.mousedown(evt));
    canvas.c.addEventListener("mouseup", evt => canvas.mouseup(evt));
    canvas.c.addEventListener("mousemove", evt => canvas.mousemove(evt));
    canvas.draw();

    window.addEventListener("resize", resizeHandler);
}
