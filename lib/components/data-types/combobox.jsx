import cx from 'classnames';
import forEach from 'lodash.foreach';
import React from 'react';
import {Component} from 'relax-framework';

export default class Combobox extends Component {
	static propTypes = {
		option:  React.PropTypes.object.isRequired,
		labels: React.PropTypes.array.isRequired,
		values: React.PropTypes.array,
		value: React.PropTypes.any.isRequired,
		onChange: React.PropTypes.func.isRequired,
		className: React.PropTypes.string,
		style: React.PropTypes.object
	}

	render () {
		return (

			<div className="form-group">
				{this.props.option.label && <label htmlFor={this.props.option.id}>{this.props.option.label}</label>}

				<select name={this.props.option.id} ref={this.props.option.id} className={cx(this.props.className,"select2_demo_1 form-control")}
						onChange={this.props.onChange.bind(this, this.props.option.id)} value={this.props.value}>
					{this.props.option.isAllShow && <option value="all">全部</option>}
					{this.props.option.isNullShow && <option value="">请选择</option>}
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
