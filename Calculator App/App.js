import React from 'react';
import './App.css';

const operands = ['+', '-', '*', '/'];

class Key extends React.Component {
	render() {
		return (
			<button onClick={this.props.onClick}>{this.props.value}</button>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: 0,
			stack: [],
			nextNumber: false,
			lastKey: null
		};
	}

	renderNumericKey(num) {
		return (
			<Key onClick={() => this.handleNumericClick(num)} value={num} />
		);
	}

	renderOperandKey(op) {
		return (
			<Key onClick={() => this.handleOperandClick(op)} value={op} />
		);
	}

	renderCommandKey(cmd) {
		return (
			<Key onClick={() => this.handleCommandClick(cmd)} value={cmd} />
		);
	}

	handleNumericClick(num) {
		let input = this.state.input;

		if(input === 0 || input === 'Err' || this.state.nextNumber) {
			input = "" + num;
		} else {
			input += "" + num;
		}

		this.setState({ input: input });
		this.setState({ lastKey: num });
	}

	handleOperandClick(op) {
		const input = this.state.input;
		const stack = this.state.stack;

		if(operands.indexOf(this.state.lastKey) >= 0) {
			this.state.stack.pop();
		} else {
			stack.push(input);
		}

		switch(op) {
			case '+':
				stack.push('+');

				break;
			case '-':
				stack.push('-');

				break;
			case '*':
				stack.push('*');

				break;
			case '/':
				stack.push('/');

				break;
			default:
				break;
		}

		this.setState({ stack: stack });
		this.setState({ nextNumber: true });
		this.setState({ lastKey: op });
	}

	handleCommandClick(cmd) {
		switch(cmd) {
			case 'C':
				this.setState({ input: 0 });
				this.setState({ stack: [] });
				this.setState({ nextNumber: false });

				break;
			case '=':        
				const stack = this.state.stack;
				let val = 0;

				stack.push(this.state.input);

				if(stack.length % 2 === 0) {
					this.setState({ input: "Err" });
					return;
				}

				while(true) {
					let x = stack.shift();
					let op = stack.shift();
					let y = stack.shift();

					val = eval(x + op + y);  //I wouldn't use eval() in a production app, but for purposes of this exercise I used it for simplicity

					if(stack.length === 0) {
						break;
					} else {
						stack.unshift(val);
					}
				}

				this.setState({ input: val });

				break;
			default:
				break;
		}

  		this.setState({ lastKey: cmd });
	}

	render() {
		return (
			<div>
				<table>
					<tr>
						<td colSpan="4"><input type="text" className="display" value={this.state.input} /></td>
					</tr>

					<tr>
						<td>{this.renderNumericKey(7)}</td>
						<td>{this.renderNumericKey(8)}</td>
						<td>{this.renderNumericKey(9)}</td>
						<td>{this.renderOperandKey('/')}</td>
					</tr>

					<tr>
						<td>{this.renderNumericKey(4)}</td>
						<td>{this.renderNumericKey(5)}</td>
						<td>{this.renderNumericKey(6)}</td>
						<td>{this.renderOperandKey('*')}</td>
					</tr>

					<tr>
						<td>{this.renderNumericKey(1)}</td>
						<td>{this.renderNumericKey(2)}</td>
						<td>{this.renderNumericKey(3)}</td>
						<td>{this.renderOperandKey('-')}</td>
					</tr>

					<tr>
						<td>{this.renderCommandKey('C')}</td>
						<td>{this.renderNumericKey(0)}</td>
						<td>{this.renderCommandKey('=')}</td>
						<td>{this.renderOperandKey('+')}</td>
					</tr>
				</table>
			</div>
		);
	}
}

export default Calculator;