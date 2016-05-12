import * as adminActions from '../../client/actions/admin';

import React, {PropTypes} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import pluck from 'lodash.pluck';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';
import moment from 'moment';
import A from '../../components/a';
import Lightbox from '../../components/lightbox';
import Utils from '../../helpers/utils';
import LabelPicker from './label-picker';
import {findDOMNode} from 'react-dom';


@connect(
	(state) => ({
		labelPickerByType: state.labelPickerByType.data.items,
		labelsPicker: state.labelsPicker.data.items
	}),
	(dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class LabelPickerByType extends Component {
	static fragments = {
		labelPickerByType: {
			_id: 1,
			title: 1,
			type: 1
		}
	};
	static propTypes = {
		selectedLabels: PropTypes.array.isRequired,
		labelsType: PropTypes.string.isRequired,
		labelPickerByType: PropTypes.array.isRequired,
		selectedLabelsMaxLength: PropTypes.number.isRequired,
		labelsPicker: PropTypes.array.isRequired,
		onConfirm: PropTypes.func.isRequired,
		getAdmin: PropTypes.func.isRequired
	};

	getInitState() {
		return {
			selectedLabels: this.props.selectedLabels
		};
	}

	onLabelItemClick(label) {
		let selectedLabels = this.state.selectedLabels;
		const isSelected = selectedLabels.find((selectedLabel) => selectedLabel._id === label._id);
		if (isSelected) {
			selectedLabels = selectedLabels.filter((selectedLabel)=>selectedLabel._id !== label._id);
		} else {
			if(this.props.selectedLabelsMaxLength && selectedLabels.length >= this.props.selectedLabelsMaxLength){
				return;
			}
			selectedLabels.push(label);
		}
		this.setState({
			selectedLabels: selectedLabels
		})
	}

	componentDidMount() {
		if (this.props.labelsType === 'userAssortment') {
			const labelPickerByType = {
				type: {
					value: 'userAssortment',
					type: 'String!'
				}
			};
			this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {
				labelPickerByType: labelPickerByType
			})).done();
		}else{
			this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {
				labelPickerByType: {
					type: {
						value: 'classify',
						type: 'String!'
					}
				}
			})).done();
		}
	}

	render() {
		return (
			<div className='admin-scrollable'>
				<div className='white-options list'>
					<form className="form-horizontal">

						<div className="form-group">
							<label className="col-lg-3 control-label" htmlFor='labels'>标签集</label>
							<div className="col-lg-9 text-left">
								{this.props.labelPickerByType.map(this.renderLabelsByTypeItem, this)}
							</div>
						</div>
						<div className="form-group">
							<label className="col-lg-3 control-label" htmlFor='labels'>已选标签</label>
							<div className="col-lg-9">
								<input ref="labels" type="text" className="form-control"
									   value={pluck(this.state.selectedLabels, 'title')}/>
							</div>
						</div>
						<div className="text-center">
							<a className='button button-primary' href='#'
							   onClick={this.props.onConfirm.bind(this, this.state.selectedLabels)}>保存</a>
						</div>
					</form>
				</div>
			</div>
		);
	}

	renderLabelsByTypeItem(label) {
		const btnStype = this.state.selectedLabels.find((selectedLabel) => selectedLabel._id === label._id);
		return (
			<div className="col-lg-3" style={{padding: '3px'}} key={label._id}>
				<button type="button" className={cx('btn btn-xs', btnStype && 'btn-primary')}
						onClick={this.onLabelItemClick.bind(this, label)}>
					{label.title}
				</button>
			</div>
		);
	}

}
