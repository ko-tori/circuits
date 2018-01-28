import { Component } from "./lib/Component";

export let topLevelComponents = new Set<GUID>();
export let componentMap: Map<GUID, Component>;

export interface Newable<T> {
    new(...args: any[]): T;
}

/// globally unique identifier
export class GUID extends String {
    static all: Set<String> = new Set<String>();
    static new(): GUID {
        let string;
        while (true) {
            let bytes = crypto.getRandomValues(new Uint8Array(16));
            string = new String();
            for (let byte of bytes) string += String.fromCharCode(byte);
            if (!GUID.all.has(string)) break;
        }
        GUID.all.add(string);
        return string;
    }
}

/// generic pair class
export class Vector<T> {
    constructor(public x: T, public y: T) { }
}

export class Point extends Vector<number> {
    // numerical methods
    public negate() { return new Point(-this.x, -this.y); }
    public add(other: Point) { return new Point(this.x + other.x, this.y + other.y); }
    public sub(other: Point) { return this.add(other.negate()); }
}