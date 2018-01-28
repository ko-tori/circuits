import { GUID } from "./Common";

export class Component {
	private componentMap: Map<GUID, Component>;
	private guid: GUID;

	/// creates a new component from a smaller component
	static from(component: Component) {

	}
	constructor(private inputs: Link[] = [], private outputs: Component[] = []) {
		this.guid = GUID.new();
	}
}

export class Link {
	constructor(private component: Component, private index: number) {
	}
}