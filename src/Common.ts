import { Component } from "./lib/Component";

export let topLevelComponents = new Set<GUID>();

/// expanding bit array that extends the functionality of uint array
export class BitArray {
    // TODO: automatically expanding
    private array: Uint8Array = new Uint8Array(40);
    public get(index: number) {
        // TODO: actually get the bit
        return this.array[index];
    }
    public set(index: number, value: boolean) {
        this.array[index] = value ? 1 : 0;
    }
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
    constructor(public x: T, public y: T) {
    }
}
