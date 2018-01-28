import { Component } from "./lib/Component";

export let topLevelComponents = new Set<GUID>();

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
    constructor(public x: T, public y: T) {
    }
}
