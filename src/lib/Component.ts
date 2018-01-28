import { BitArray, GUID, Vector } from "../Common";

export let componentMap: Map<GUID, Component>;

interface IO {
	guid: GUID,
	number: number
}

interface Link {
	from: IO;
	to: IO;
}

export class Component {
	private components: Set<GUID>;
	private locationMap: Map<GUID, Vector<number>>;
	private links: Set<Link>;

	private evaluate: ((inputs: BitArray) => BitArray);

	// id
	public guid: GUID;
	/// whether the component should show a name or internal components
	private named: boolean;

	/// creates a new component from a smaller component
	static from(inner: Component): Component {
		let outer = new Component();
		outer.components.add(inner.guid);
		return outer;
	}
	constructor(private inputs: Link[] = [], private outputs: Component[] = []) {
		this.guid = GUID.new();

	}

	attach(link: Link): boolean {
		if (this.components.has(link.from.guid)) {
			this.components.add(link.to.guid);
			this.links.add(link);
			return true;
		}
		if (this.components.has(link.from.guid)) {
			this.components.add(link.to.guid);
			this.links.add(link);
			return true;
		}
		return false;
	}
}

export class ANDComponent {

}