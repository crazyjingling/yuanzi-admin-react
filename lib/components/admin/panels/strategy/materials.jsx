import React from 'react';
import {Component} from 'relax-framework';
import Material from './material';


export default class Materials extends Component {
	static propTypes = {
		type: React.PropTypes.string.isRequired,
		existsMaterials: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func.isRequired
	}

	onChange(index, material) {
		let materials = this.props.existsMaterials;
		if(index > material.length){
			materials[index] = {
				title: '',
				amount: ''
			};
		}
		materials[index] = material;
		this.props.onChange(this.props.type,materials);
	}
	onAdd(){
		let materials = this.props.existsMaterials;
		materials.push({
			title: '',
			amount: ''
		});
		console.log('=================================materials', materials);
		this.props.onChange(this.props.type,materials);
	}
	render() {
		return (
			<div>
				{this.props.existsMaterials.map((item,index)=>{
					return (
						<div>
							<Material key={index} index={index} onChange={::this.onChange} material={item}/>
							<div className="hr-line-dashed"></div>
						</div>
					)
				})}
				<button className="btn btn-primary btn-circle" type="button"
						onClick={::this.onAdd}>
					<i className="fa fa-plus" />
				</button>
			</div>
		);
	}
}
