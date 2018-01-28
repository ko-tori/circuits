import { BitArray, GUID, Vector } from "../Common";

export let componentMap: Map<GUID, Component>;

// 1. output index of parent
// 2. parent guid
// 3. input index of child
// 4. child guid
type Link = [IO, IO];
type IO = [GUID, Number];

export class Component {
	private components: Set<GUID>;
	private locationMap: Map<GUID, Vector<Number>>;
	private links: Set<Link>;
	private absoluteInput: 

	private evaluate: ((inputs: BitArray) => BitArray);

	// id
	public guid: GUID;
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

	attach(link: Link): boolean {
		if (this.components.has(link[0][0])) {
			this.components.add(link[1][0]);
			this.links.add(link);
			return true;
		}
		if (this.components.has(link[1][0])) {
			this.components.add(link[0][0]);
			this.links.add(link);
			return true;
		}
		return false;
	}
}

export class ANDComponent {

}