import React from 'react';
import {Component} from 'relax-framework';
import Step from './step';


export default class Steps extends Component {
	static step = {
		description: '',
		imgUrl: {
			_id: '',
			ossUrl: ''
		}
	};
	static propTypes = {
		existsSteps: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func.isRequired
	}

	onChange(index, step) {
		let steps = this.props.existsSteps;
		if(index > steps.length){
			steps[index] = this.constructor.step;
		}
		steps[index] = step;
		this.props.onChange('steps',steps);
	}
	onAdd(){
		let steps = this.props.existsSteps;
		steps.push(this.constructor.step);
		this.props.onChange('steps',steps);
	}
	render() {
		return (
			<div>
				{this.props.existsSteps.map((step,index)=><Step key={index} index={index} onChange={::this.onChange} step={step}/>)}
				<button className="btn btn-primary btn-circle" type="button"
						onClick={::this.onAdd}>
					<i className="fa fa-plus"></i>
				</button>
			</div>
		);
	}
}
