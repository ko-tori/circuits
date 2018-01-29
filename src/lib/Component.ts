import { componentMap, GUID, Point } from "../Common";
import { componentSize } from "../Constants";

interface IO {
	guid: GUID,
	index: number
}

interface Link {
	from: IO;
	to: IO;
}

export class Component {
	public components = new Set<GUID>();
	public links = new Set<Link>();

	public location: Point;
	public absoluteInputs = new Array<IO>();
	public absoluteOutputs = new Array<IO>();

	public evaluate: ((inputs: boolean[]) => boolean[]);
	public resolve(a: boolean[]): void { }

	// id
	public guid: GUID;
	/// whether the component should show a name or internal components
	private named: boolean;

	/// creates a new component from a smaller component
	static from(inner: Component): Component {
		let outer = new Component(inner.location);
		outer.components.add(inner.guid);
		for (let io of inner.absoluteOutputs) {
			outer.absoluteOutputs.push(io);
		}
		for (let io of inner.absoluteInputs) {
			outer.absoluteInputs.push(io);
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
			let toComponent = componentMap.get(link.to.guid);
			if (toComponent == undefined) return false;
			toComponent.links.add(link);
			this.absoluteOutputs.splice(this.absoluteOutputs.indexOf(link.from), 1);
			for (let io of toComponent.absoluteOutputs) {
				this.absoluteOutputs.push(io);
			}
			return true;
		}
		if (this.components.has(link.to.guid)) {
			this.components.add(link.from.guid);
			let fromComponent = componentMap.get(link.to.guid);
			if (fromComponent == undefined) return false;
			fromComponent.links.add(link);
			this.absoluteInputs.splice(this.absoluteInputs.indexOf(link.to), 1);
			for (let io of fromComponent.absoluteInputs) {
				this.absoluteInputs.push(io);
			}
			return true;
		}
		return false;
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(0, 0, componentSize, 0, Math.PI * 2);
		ctx.stroke();
	}
}

export class ANDComponent extends Component {
	public resolve(a: boolean[]): void {
		let values = this.evaluate(a);
		for (let link of this.links) {
			let toComponent = componentMap.get(link.to.guid);
			if (toComponent == undefined) continue;
			// toComponent.resolve(values[link.from.index]);
		}
	}
	constructor(location: Point) {
		super(location);
		this.absoluteInputs.push(<IO>{ guid: this.guid, index: 0 });
		this.absoluteInputs.push(<IO>{ guid: this.guid, index: 1 });
		this.absoluteOutputs.push(<IO>{ guid: this.guid, index: 0 });
	}
	public evaluate = (inputs: boolean[]): boolean[] => {
		return [inputs[0] && inputs[1]];
	};
}

export class Source extends Component {

}