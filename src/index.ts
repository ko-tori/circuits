import { Library } from "./lib/Library";
import { Component } from "./lib/Component";

import * as Canvas from "./ui/Canvas";

const resizeHandler = function (evt) {
    let target = <Window>evt.target;
    Canvas.canvas.width = target.innerWidth;
    Canvas.canvas.height = target.innerHeight;
    Canvas.Draw();
}

export function main() {
    Canvas.canvas.width = window.innerWidth;
    Canvas.canvas.height = window.innerHeight;

    Canvas.canvas.focus();
    Canvas.canvas.addEventListener("mousemove", Canvas.MouseMove);
    Canvas.Draw();

    window.addEventListener("resize", resizeHandler);
}
