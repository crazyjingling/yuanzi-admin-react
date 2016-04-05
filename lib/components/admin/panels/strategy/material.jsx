import React from 'react';
import {Component} from 'relax-framework';

export default class Material extends Component {
	static propTypes = {
		type: React.PropTypes.string.isRequired,
		index: React.PropTypes.number.isRequired,
		material: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired
	}

	getInitState() {
		return {
			existsSteps: this.props.existsSteps
		};
	}

	onChange(id, event) {
		let item = this.props.material;
		item[id] = event.target.value;
		this.props.onChange(this.props.index, item);
	}

	render() {
		return (
		<div key={this.props.index} className="row">
			<div className="col-md-5">
				<input className="form-control"
					value={this.props.material.title}
				       onChange={this.onChange.bind(this,'title')}
				       placeholder="名称"/>
			</div>
			<div className="col-md-5">
				<input className="form-control"
					value={this.props.material.amount} onChange={this.onChange.bind(this,'amount')}
				       placeholder="数量"/>
			</div>
		</div>
		);
	}
}
