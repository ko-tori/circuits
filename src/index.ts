import { Library } from "./lib/Library";
import { Component, ANDComponent, componentMap } from "./lib/Component";
import { Vector } from "./Common";

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

    // let a = new ANDComponent(new Vector<number>(0, 0));
    // let b = Component.from(a);
    // let c = new ANDComponent(new Vector<number>(0, 0));
    // b.attach({from: {guid: c.guid, number: 0}, to: {guid: b.guid, number: 0}});
}
