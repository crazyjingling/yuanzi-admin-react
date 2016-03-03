import cx from 'classnames';
import forEach from 'lodash.foreach';
import React from 'react';
import {Component} from 'relax-framework';
import {findDOMNode} from 'react-dom';

export default class Combobox extends Component {
	static propTypes = {
		option:  React.PropTypes.object.isRequired,
		labels: React.PropTypes.array.isRequired,
		values: React.PropTypes.array,
		value: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		className: React.PropTypes.string,
		style: React.PropTypes.object
	}

	getInitState () {
		return {
			opened: false
		};
	}

	toggle () {
		this.setState({
			opened: !this.state.opened
		});
	}

	optionClicked ( event ) {
		event.preventDefault();

		if (this.props.onChange) {
			let data = {
				id: event.target.name,
				value: event.target.value
			};
			if(this.props.values){
				data.label= event.target.selectedOptions[0].label;
			}
			this.props.onChange(data);
		}

		this.setState({
			opened: false
		});
	}

	render () {
		return (

			<div>
				<label htmlFor={this.props.option.id}>{this.props.option.label}</label>

				<select name={this.props.option.id} ref={this.props.option.id} className="select2_demo_1 form-control"
						onChange={this.optionClicked.bind(this)} value={this.props.value}>
					{this.props.option.isAllShow && <option value="all">全部</option>}
					{(this.props.labels || this.props.values).map(this.renderOption, this)}
				</select>
			</div>
		);
	}

	renderOption (option, i) {
		let values = [];
		if(!this.props.values){
			values = this.props.labels;
		}else{
			values = this.props.values;

		}
		return (
			<option value={values[i]}>{option}</option>
		);
	}
}
