import React from 'react';
import {Component} from 'relax-framework';
import {filter} from 'lodash';

export default class Strategy extends Component {
	static propTypes = {
		selectedStrategies: React.PropTypes.array.isRequired,
		strategy: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired
	}

	onChange(strategy, event) {
		let selectedStrategies = this.props.selectedStrategies;
		const checked = event.target.checked;
		if (checked) {
			selectedStrategies.push(strategy)
		} else {
			selectedStrategies = filter(selectedStrategies, (o) => o._id !== strategy._id);
		}
		this.props.onChange('strategies', selectedStrategies);

	}

	render() {
		let checked = filter(this.props.selectedStrategies, (o) => o._id == this.props.strategy._id).length;
		console.log(this.props)
		return (
			<div className="col-lg-3">
				<div className="ibox">
					<div className="ibox-content product-box">
						<div className="product-imitation" style={{ padding: 0 }}>
							<img src={this.props.strategy.cover} width="140px" height="140px"/>
						</div>
						<div className="product-desc">
							<div className="product-name">{this.props.strategy.title}</div>
							<small>by {this.props.strategy.owner? this.props.strategy.owner.nickname: ''}</small>
						</div>
					</div>
					<input type="checkbox" value="1" checked={checked} onChange={this.onChange.bind(this,this.props.strategy)}/>
				</div>

			</div>
		);
	}
}
