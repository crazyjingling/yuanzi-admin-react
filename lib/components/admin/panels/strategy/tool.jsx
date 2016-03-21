import React from 'react';
import {Component} from 'relax-framework';

export default class Tool extends Component {
	static propTypes = {
		type: React.PropTypes.string.isRequired,
		index: React.PropTypes.number.isRequired,
		tool: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired
	}

	getInitState() {
		return {
			existsSteps: this.props.existsSteps
		};
	}

	onChange(id, event) {
		let item = this.props.tool;
		item[id] = event.target.value;
		this.props.onChange(this.props.index, item);
	}

	render() {
		return (
		<div key={this.props.index}>
			<label className="control-label">{`工具${this.props.index+1}`}</label>
			<input value={this.props.tool.title} onChange={this.onChange.bind(this,'title')}
				   placeholder="名称"/>
			<input value={this.props.tool.amount} onChange={this.onChange.bind(this,'amount')}
				   placeholder="数量"/>
		</div>
		);
	}
}
