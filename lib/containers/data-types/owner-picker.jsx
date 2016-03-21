import * as adminActions from '../../client/actions/admin';

import {forEach,indexOf,concat} from 'lodash';
import pluck from 'lodash.pluck';
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
		let owners = [];
		let values = [];
		let pickerOwners = pluck(this.props.ownerPicker, 'nickname');
		let pickerValues = pluck(this.props.ownerPicker, '_id');
		//将当前登录用户加入
		if(this.props.user && indexOf(pickerValues,this.props.user._id) === -1){
			owners.push(this.props.user.nickname);
			values.push(this.props.user._id);
		}
		//如果当前作者不在作者列表中,就将他加入
		if(this.props.otherValues &&
			this.props.otherValues.value &&
			indexOf(pickerValues,this.props.otherValues.value) === -1 &&
			indexOf(values,this.props.otherValues.value) === -1
		){
			owners.push(this.props.otherValues.label);
			values.push(this.props.otherValues.value);
		}

		owners = concat(owners, pickerOwners);
		values = concat(values, pickerValues);
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
