import { componentMap, GUID, Point } from "../Common";

interface IO {
	guid: GUID,
	number: number
}

interface Link {
	from: IO;
	to: IO;
}

export class Component {
	private components: Set<GUID> = new Set<GUID>();
	private links: Set<Link> = new Set<Link>;
	private absoluteInputs: Array<IO> = new Array<IO>();
	private absoluteOutputs: Array<IO> = new Array<IO>();
	public location: Point;

	public evaluate: ((inputs: boolean[]) => boolean[]);

	public resolve(a: boolean[]): boolean[] {
		return a;
	}

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
		componentMap.set(this.guid, this);
		this.location = location;
		componentMap.set(this.guid, this);
	}

	compose(): void {

	}

	attach(link: Link): boolean {
		if (this.components.has(link.from.guid)) {
			this.components.add(link.to.guid);
			componentMap.get(link.to.guid).links.add(link);
			this.absoluteOutputs.splice(this.absoluteOutputs.indexOf(link.from), 1);
			let toComponent = componentMap.get(link.to.guid);
			if (toComponent == undefined) return false;
			for (let io of toComponent.absoluteOutputs) {
				this.absoluteOutputs.add(io);
			}
			return true;
		}
		if (this.components.has(link.to.guid)) {
			this.components.add(link.from.guid);
			componentMap.get(link.from.guid).links.add(link);
			this.absoluteInputs.splice(this.absoluteInputs.indexOf(link.to), 1);
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
	private absoluteInputs: Set<IO> = new Set<IO>();
	private absoluteOutputs: Set<IO> = new Set<IO>();

	public resolve(a: boolean[]): void {
		let values = this.evaluate(a);
		for(let link of this.links) {
			componentMap.get(link.to.guid).resolve(values[link.from.number]);
		}
	}

	constructor(location: Vector<number>) {
		super(location);
		this.absoluteInputs.add(<IO>{guid: this.guid, number: 0});
		this.absoluteInputs.add(<IO>{guid: this.guid, number: 1});
		this.absoluteOutputs.add(<IO>{guid: this.guid, number: 0});
		this.values = [false];
	}

	public evaluate = (p: boolean[]): boolean[] => {
		return [p[0] && p[1]];
	};
}

export class Source extends Component {

}