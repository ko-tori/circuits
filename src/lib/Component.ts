import { componentMap, GUID, Point } from "../Common";

interface IO {
	guid: GUID,
	index: number
}

interface Link {
	from: IO;
	to: IO;
}

export class Component {
	private components = new Set<GUID>();
	private links = new Set<Link>();

	public location: Point;
	public absoluteInputs = new Set<IO>();
	public absoluteOutputs = new Set<IO>();

	public evaluate: ((inputs: boolean[]) => boolean[]);

	// id
	public guid: GUID;
	/// whether the component should show a name or internal components
	private named: boolean;

	/// creates a new component from a smaller component
	static from(inner: Component): Component {
		let outer = new Component(inner.location);
		outer.components.add(inner.guid);
		for (let io of inner.absoluteOutputs) {
			outer.absoluteOutputs.add(io);
		}
		for (let io of inner.absoluteInputs) {
			outer.absoluteInputs.add(io);
		}
		return outer;
	}

	constructor(location: Point) {
		this.guid = GUID.new();
		this.location = location;
		componentMap.set(this.guid, this);
	}

	compose(): void {

	}

	attach(link: Link): boolean {
		if (this.components.has(link.from.guid)) {
			this.components.add(link.to.guid);
			this.links.add(link);
			this.absoluteOutputs.delete(link.from);
			let toComponent = componentMap.get(link.to.guid);
			if (toComponent == undefined) return false;
			for (let io of toComponent.absoluteOutputs) {
				this.absoluteOutputs.add(io);
			}
			return true;
		}
		if (this.components.has(link.to.guid)) {
			this.components.add(link.from.guid);
			this.links.add(link);
			this.absoluteInputs.delete(link.to);
			let fromComponent = componentMap.get(link.to.guid);
			if (fromComponent == undefined) return false;
			for (let io of fromComponent.absoluteInputs) {
				this.absoluteInputs.add(io);
			}
			return true;
		}
		return false;
	}
}

export class ANDComponent extends Component {
	public absoluteInputs = new Set<IO>();
	public absoluteOutputs = new Set<IO>();
	constructor(location: Point) {
		super(location);
		this.absoluteInputs.add(<IO>{ guid: this.guid, index: 0 });
	}
	public evaluate = (p: boolean[]): boolean[] => {
		return [p[0] && p[1]];
	};
}