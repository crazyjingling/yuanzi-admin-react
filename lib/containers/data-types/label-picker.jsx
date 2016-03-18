import * as adminActions from '../../client/actions/admin';

import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import Combobox from '../../components/data-types/combobox';

@connect(
	(state) => ({
		labelsPicker: state.labelsPicker.data.items
	}),
	(dispatch) => bindActionCreators(adminActions, dispatch)
)

export default class LabelPickerContainer extends Component {
	static fragments = {
		labelsPicker: {
			_id: 1,
			title: 1
		}
	};

	static propTypes = {
		option: PropTypes.object.isRequired,
		value: PropTypes.string.isRequired,
		className: PropTypes.string,
		labelsType: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
		labelsPicker: PropTypes.array.isRequired,
		getAdmin: PropTypes.func.isRequired
	};

	componentDidMount() {
		if(this.props.labelsType.length > 0){
			const search = JSON.stringify({
				type: {
					value: {
						'$in': this.props.labelsType
					},
					type: 'select' // 这里的type是在query-pagination.js中解析时用的,当type为text时该字段要做模糊查询
				}
			});
			this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {
				labelsPicker: {
					search: {
						value: search,
						type: 'String!'
					}
				}
			})).done();
		}
	}

	render() {
		const labels = [];
		const values = [];

		forEach(this.props.labelsPicker, (label) => {
			labels.push(label.title);
			values.push(label._id);
		});

		return (
			<Combobox
				className={this.props.className}
				option={this.props.option}
				value={this.props.value}
				onChange={this.props.onChange}
				values={values}
				labels={labels}
			/>
		);
	}
}
