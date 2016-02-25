import * as labelsActions from '../../client/actions/labels';

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
		count: state.labels.data.count
	}),
	(dispatch) => bindActionCreators(labelsActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 10,
	sort: '_id',
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
		removeLabel: PropTypes.func.isRequired,
		addLabel: PropTypes.func.isRequired,
	}
	getInitState() {
		return {
			searchValues: labelConfig.searchValues || {},
			lightbox: false,
			removing: false,
			recommending: false,
			previewing: false
		};
	}

	onRemove(id, event) {
		event.preventDefault();
		this.setState({
			removing: true,
			removeId: id
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
		this.props.removeLabel(labelConfig.fragments, this.state.removeId)
			.done(()=>{
				const vars = {
					labels: {
						...this.props.queryVariables
					}
				};

				this.props
					.getAdmin(buildQueryAndVariables(
						this.constructor.fragments,
						vars
					))
					.done();
			});
		this.setState({
			removing: false
		});

	}

	onEdit(id, event) {
		event.preventDefault();
		this.setState({
			removing: true,
			removeId: id
		});
	}

	onRecommend(id, event) {
		event.preventDefault();
		this.setState({
			removing: true,
			removeId: id
		});
	}



	componentWillReceiveProps(nextProps) {
		console.log('=================================type', this.constructor.type);
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

	onAddNew(newLabel) {
		this.props
			.addLabel({label: Labels.fragments.labels}, newLabel)
			.then(() => {
				this.onCloseLightbox();
			});
	}

	onAddNewClick(event) {
		event.preventDefault();
		this.setState({
			lightbox: true
		});
	}

	onCloseLightbox() {
		this.setState({
			lightbox: false
		});
	}

	render() {
		return (
			<div>
				<Labels
					{...this.props}
					{...this.state}
					onCloseLightbox={::this.onCloseLightbox}
					onAddNew={::this.onAddNew}
					onAddNewClick={::this.onAddNewClick}
					onRemove={::this.onRemove}
					onEdit={::this.onEdit}
					onRecommend={::this.onRecommend}
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
