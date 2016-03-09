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
		className: PropTypes.string.isRequired,
		labelsType: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		labelsPicker: PropTypes.array.isRequired,
		getAdmin: PropTypes.func.isRequired
	};

	componentDidMount() {
		if(this.props.labelsType !== 'userAssortment'){
			const search = JSON.stringify({
				title: {
					value: {
						'$in': ['全部', '故事', '英文', '游戏', '手工', '自然', '艺术', '乐途', '美食', '其它']
					},
					type: 'select'
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
