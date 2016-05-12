import * as labelsActions from '../../client/actions/label';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';
import Lightbox from '../../components/lightbox';

import queryProps from '../../decorators/query-props';
import Labels from '../../components/admin/panels/labels';
import {labelConfig} from './containerInitConfig';
import filter from 'lodash.filter';
import QRCode from 'qrcode.react';


@connect(
	(state) => ({
		labels: state.labels.data.items,
		label: state.label.data,
		count: state.labels.data.count
	}),
	(dispatch) => bindActionCreators(labelsActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'desc'
})
export default class LabelsContainer extends Component {
	static fragments = Labels.fragments;

	static panelSettings = labelConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		labels: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		updateLabel: PropTypes.func.isRequired,
		removeLabel: PropTypes.func.isRequired,
		addLabel: PropTypes.func.isRequired,
		changeLabelFields: PropTypes.func.isRequired
	}
	getInitState() {
		return {
			searchValues: labelConfig.searchValues || {},
			lightbox: false,
			removing: false,
			recommending: false,
			previewing: false,
			edit: false,
			editingLabel: false
		};
	}
	// 删除
	onRemove(data, event) {
		event.preventDefault();
		this.setState({
			removing: true,
			removeData: data
		});
	}
	cancelRemove(event) {
		event.preventDefault();
		this.setState({
			removing: false
		});
	}
	confirmRemove(event) {
		event.preventDefault();
		this.props.removeLabel({
			label: {_id: 1}
		}, this.state.removeData._id)
			.done();
		this.setState({
			removing: false
		});

	}
	//新建
	onAddNew (event) {
		event.preventDefault();
		this.setState({
			edit: true,
			editingLabel: false
		});
	}
	//编辑
	onEdit (label) {
		console.log("onedit",label);
		this.setState({
			edit: true,
			editingLabel: label
		});
	}
	onEditClose () {
		this.setState({
			edit: false,
			editingLabel: false
		});
	}

	onChange (id, value) {
		this.props.changeLabelFields(id, value);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				labels: {
					...nextProps.queryVariables
				}
			};

			nextProps
				.getAdmin(buildQueryAndVariables(
					this.constructor.fragments,
					vars
				))
				.done();
		}
	}
	render() {
		return (
			<div>
				<Labels
					{...this.props}
					{...this.state}
					onAddNew={::this.onAddNew}
					onRemove={::this.onRemove}
					onEdit={::this.onEdit}
					onEditClose={::this.onEditClose}
					onChange={::this.onChange}
				/>
				{this.renderRemoving()}
			</div>
		);
	}

	renderRemoving() {
		if (this.state.removing) {
			const label = `您是否确定删除当前数据?`;
			const label1 = '删除后将无法恢复';
			return (
				<Lightbox className='small' header={false}>
					<div className='big centered'>{label}</div>
					<div className='medium centered'>{label1}</div>
					<div className='centered space-above'>
						<a className='button button-grey margined' href='#'
						   onClick={this.cancelRemove.bind(this)}>取消</a>
						<a className='button button-alert margined' href='#'
						   onClick={this.confirmRemove.bind(this)}>确定</a>
					</div>
				</Lightbox>
			);
		}
	}

}
