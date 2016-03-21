import React from 'react';
import {Component} from 'relax-framework';
import Tool from './tool';


export default class Tools extends Component {
	static item = {
		title: '',
		amount: ''
	};
	static propTypes = {
		type: React.PropTypes.string.isRequired,
		existsTools: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func.isRequired
	}

	onChange(index, tool) {
		let tools = this.props.existsTools;
		if(index > tool.length){
			tools[index] = {
				title: '',
				amount: ''
			};
		}
		tools[index] = tool;
		this.props.onChange(this.props.type,tools);
	}
	onAdd(){
		let tools = this.props.existsTools;
		tools.push({
			title: '',
			amount: ''
		});
		console.log('=================================tools', tools);
		this.props.onChange(this.props.type,tools);
	}
	render() {
		return (
			<div>
				{this.props.existsTools.map((item,index)=><Tool key={index} index={index} onChange={::this.onChange} tool={item}/>)}
				<button className="btn btn-primary btn-circle" type="button"
						onClick={::this.onAdd}>
					<i className="fa fa-plus"></i>
				</button>
			</div>
		);
	}
}
