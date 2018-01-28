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
	private location: Vector<number>;
	private links: Set<Link>;
	private absoluteInputs: Set<IO>;
	private absoluteOutputs: Set<IO>;

	private evaluate: ((inputs: BitArray) => BitArray);

	// id
	public guid: GUID;
	/// whether the component should show a name or internal components
	private named: boolean;

	/// creates a new component from a smaller component
	static from(inner: Component): Component {
		let outer = new Component();
		outer.components.add(inner.guid);
		for(let io of inner.absoluteOutputs) {
			outer.absoluteOutputs.add(io);
		}
		for(let io of inner.absoluteInputs) {
			outer.absoluteInputs.add(io);
		}
		return outer;
	}

	constructor(private inputs: Link[] = [], private outputs: Component[] = []) {
		this.guid = GUID.new();

	}

	compose(): void {

	}

	attach(link: Link): boolean {
		if (this.components.has(link.from.guid)) {
			this.components.add(link.to.guid);
			this.links.add(link);
			this.absoluteOutputs.remove(link.from);
			for(let io of link.to.guid.absoluteOutputs) {
				this.absoluteOutputs.add(io);
			}
			return true;
		}
		if (this.components.has(link.to.guid)) {
			this.components.add(link.from.guid);
			this.links.add(link);
			this.absoluteInputs.remove(link.to);
			for(let io of link.from.guid.absoluteInputs) {
				this.absoluteInputs.add(io);
			}
			return true;
		}
		return false;
	}
}

export class ANDComponent extends Component {
	private evaluate(p: BitArray): BitArray {
		let r = new BitArray();
		r.set(0, p[0] & p[1]);
		return r;
	}
}