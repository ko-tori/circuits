import { BitArray, GUID, Vector } from "../Common";

// 1. output index of parent
// 2. parent guid
// 3. input index of child
// 4. child guid
type Link = [Number, GUID, Number, GUID];

export class Component {
	private componentMap: Map<GUID, Component>;
	private locationMap: Map<GUID, Vector<Number>>;
	private links: Set<Link>;

	private evaluate: ((inputs: BitArray) => BitArray);

	// id
	private guid: GUID;
	/// whether the component should show a name or internal components
	private named: boolean;

	/// creates a new component from a smaller component
	static from(inner: Component): Component {
		let outer = new Component();
		outer.componentMap.set(inner.guid, inner);
		return outer;
	}
	constructor(private inputs: Link[] = [], private outputs: Component[] = []) {
		this.guid = GUID.new();
	}

	/// link two components
	static link(a: Component, b: Component) {
	}
}
