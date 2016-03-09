import * as adminActions from '../../client/actions/admin';

import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import Combobox from '../../components/data-types/combobox';

@connect(
	(state) => ({
		ownerPicker: state.ownerPicker.data.items,
		errors: state.ownerPicker.errors
	}),
	(dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class OwnerPickerContainer extends Component {
	static fragments = {
		ownerPicker: {
			_id: 1,
			nickname: 1
		}
	}

	static propTypes = {
		user: PropTypes.object,
		option: PropTypes.object.isRequired,
		otherValues: PropTypes.object.isRequired,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		ownerPicker: PropTypes.array.isRequired,
		getAdmin: PropTypes.func.isRequired
	}

	componentDidMount() {
		const search = JSON.stringify({
			owner: {
				value: this.props.user._id,
				type: 'select'
			}
		});
		this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {
			ownerPicker: {
				search: {
					value: search,
					type: 'String!'
				}
			}
		})).done();
	}

	render() {
		const owners = [];
		const values = [];
		//如果当前作者不在作者列表中,就将他加入
		if(this.props.otherValues && this.props.otherValues.value){
			owners.push(this.props.otherValues.label);
			values.push(this.props.otherValues.value);
		}
		forEach(this.props.ownerPicker, (owner) => {
			owners.push(owner.nickname);
			values.push(owner._id);
		});

		return (
			<Combobox
				option={this.props.option}
				value={this.props.value}
				onChange={this.props.onChange}
				values={values}
				labels={owners}
			/>
		);
	}
}
