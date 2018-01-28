import { Library } from "./lib/Library";
import { Component } from "./lib/Component";

import { canvas } from "./Common";
import * as Listener from "./ui/Listener";

export function main() {
    let componentTree = new Set<Component>();

    canvas.focus();
    canvas.addEventListener("mousemove", Listener.MouseMove);
}
