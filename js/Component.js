/**
inputs: list of [Component, output channel index]
evaluate(): returns a list of outputs
*/

class Component {
	constructor(inputs) {
		this.inputs = inputs;
	}

	evaluate() {
		throw "Not Implemented";
	}
}

class Wire extends Component {
	constructor(inputs) {
		if (inputs.length != 1)
			throw "Wire: Invalid number of inputs";
		this.input = inputs[0];
		this.numOutputs = 1;
	}

	evaluate() {
		return [this.input[0].evaluate()[this.input[1]]];
	}
}

class Source extends Component {
	constructor(input) {
		this.input = input;
		this.numOutputs = 1;
	}

	changeInput(newInput) {
		this.input = newInput;
	}

	evaluate() {
		return [this.input];
	}
}

class NAND extends Component {
	constructor(inputs) {

	}
}