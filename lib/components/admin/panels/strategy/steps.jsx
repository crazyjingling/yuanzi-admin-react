import React from 'react';
import {Component} from 'relax-framework';
import Step from './step';
import  _  from 'lodash';


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
	onDel(index, step){
		let steps = this.props.existsSteps;
		steps = _.pullAt(steps, [index + 1])
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
				{this.props.existsSteps.map((step,index)=>{
					return (
						<div>
							<Step key={index} index={index} onChange={::this.onChange} onDel={::this.onDel} step={step}/>
							<div className="hr-line-dashed"></div>
						</div>
					)
				})}
				<button className="btn btn-primary btn-circle" type="button"
						onClick={::this.onAdd}>
					<i className="fa fa-plus"/>
				</button>

			</div>
		);
	}
}
