export class Component {
	constructor(private inputs: Link[], private outputs: Component[]) {
	}
}

export class Link {
	constructor(private component: Component, private index: number) {
	}
}