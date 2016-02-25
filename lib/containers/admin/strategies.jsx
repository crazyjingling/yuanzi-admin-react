import * as strategiesActions from '../../client/actions/strategies';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import Strategies from '../../components/admin/panels/strategies';
import {strategyConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';

@connect(
	(state) => ({
		strategies: state.strategies.data.items,
		count: state.strategies.data.count
	}),
	(dispatch) => bindActionCreators(strategiesActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 10,
	sort: '_id',
	order: 'desc'
})
export default class StrategiesContainer extends Component {
	static fragments = Strategies.fragments;

	static panelSettings = strategyConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		strategies: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		removeStrategy: PropTypes.func.isRequired,
		addStrategy: PropTypes.func.isRequired
	}

	getInitState() {
		return {
			searchValues: strategyConfig.searchValues || {},
			lightbox: false,
			removing: false,
			recommending: false,
			previewing: false

		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				strategies: {
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
		this.props.removeLabel(strategyConfig.fragments, this.state.removeId)
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
	onPreview(id) {
		event.preventDefault();
		this.setState({
			previewing: true,
			previewId: id
		});
	}

	cancelPreview() {
		this.setState({
			previewing: false
		});
	}
	onEdit(id, event) {
		event.preventDefault();
		this.setState({
			editting: true,
			editId: id
		});
	}
	onRecommend(id, event) {
		event.preventDefault();
		this.setState({
			recommending: true,
			recommendId: id
		});
	}
	cancelRecommend() {
		event.preventDefault();
		this.setState({
			recommending: false
		});
	}
	confirmRemove(event) {
		event.preventDefault();
		this.props.removeStrategy(strategyConfig.fragments, this.state.removeId)
			.done();
		this.setState({
			removing: false
		});

	}
	onAddNew(newStrategy) {
		this.props
			.addStrategy({strategy: Strategies.fragments.strategies}, newStrategy)
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
				<Strategies
					{...this.props}
					{...this.state}
					onCloseLightbox={::this.onCloseLightbox}
					onAddNew={::this.onAddNew}
					onAddNewClick={::this.onAddNewClick}
					onPreview={::this.onPreview}
					onRemove={::this.onRemove}
					onEdit={::this.onEdit}
					onRecommend={::this.onRecommend}
				/>
				{this.renderPreviewing()}
				{this.renderRemoving()}
				{this.renderEditing()}
				{this.renderRecommending()}

			</div>
		);
	}

	renderPreviewing() {
		if (this.state.previewing) {
			return (
				<Lightbox className='xs' header={false} headerWithoutBorder={true} onClose={this.cancelPreview.bind(this)}>
					<div className='centered space-above'>
						<QRCode
							value={ 'http://share.iyuanzi.net/strategies/' + this.state.previewId +'/view?version=v2'}/>
					</div>
				</Lightbox>

			);
		}
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
	renderEditing() {
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
	renderRecommending() {
		if (this.state.previewing) {
			return (
				<Lightbox className='xs' header={false} headerWithoutBorder={true} onClose={this.cancelPreview.bind(this)}>
					<div className='centered space-above'>
						<QRCode
							value={ 'http://share.iyuanzi.net/strategies/' + this.state.previewId +'/view?version=v2'}/>
					</div>
				</Lightbox>

			);
		}
	}
}
