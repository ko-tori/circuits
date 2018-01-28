<<<<<<< HEAD
export class Component {
	inputs: Link[];
	constructor(inputs: Link[], outputs: Component[]) {

	}
}

export class Link {
	component: Component;
	index: number;
	constructor(component: Component, index: number) {
		this.component = component;
		this.index = index;
	}