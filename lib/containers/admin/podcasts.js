/**
 * Created by matonghe on 16/5/31.
 */
import * as podcastsActions from '../../client/actions/podcast';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables, mergeFragments} from 'relax-framework';
import Utils from '../../helpers/utils';

import queryProps from '../../decorators/query-props';
import Podcasts from '../../components/admin/panels/podcasts';
import {podcastConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import { Calendar } from 'react-date-range';
import countBy from 'lodash.countby';
@connect(
	(state) => ({
		podcasts: state.podcasts.data.items,
		count: state.podcasts.data.count
	}),
	(dispatch) => bindActionCreators(podcastsActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'desc'
})
export default class PodcastsContainer extends Component {
	static fragments = mergeFragments({
		podcastsCount: {
			count: 1
		}
	},  {podcasts: podcastConfig.fragments.podcast});
	static panelSettings = podcastConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		podcasts: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		lightbox: PropTypes.any,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		removePodcast: PropTypes.func,
		updatePodcast: PropTypes.func,
		recommendPodcast: PropTypes.func
	}

	getInitState() {
		return {
			searchValues: podcastConfig.searchValues || {},
			lightbox: false,
			removing: false,
			recommending: false,
			previewing: false,
			commentReportViewing: false,
			photoReportViewing: false,
			reportViewing: false

		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				podcasts: {
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
		this.props.removePodcast({
				podcasts: {_id: 1}
			}, this.state.removeData._id)
			.done();
		this.setState({
			removing: false
		});

	}
	onViewCommentReport(commentReportRelated) {
		event.preventDefault();
		this.setState({
			commentReportViewing: true,
			commentReportRelated: commentReportRelated
		});
	}

	cancelViewCommentReport() {
		this.setState({
			commentReportViewing: false
		});
	}

	onViewPhotoReport(photoReportRelated) {
		event.preventDefault();
		this.setState({
			photoReportViewing: true,
			photoReportRelated: photoReportRelated
		});
	}

	cancelViewPhotoReport() {
		this.setState({
			photoReportViewing: false
		});
	}

	onViewReport(reportRelated) {
		event.preventDefault();
		this.setState({
			reportViewing: true,
			reportRelated: reportRelated
		});
	}

	cancelViewReport() {
		this.setState({
			reportViewing: false
		});
	}

	onPreview(data) {
		event.preventDefault();
		this.setState({
			previewing: true,
			previewData: data
		});
	}

	cancelPreview() {
		this.setState({
			previewing: false
		});
	}

	onEdit(data, event) {
		event.preventDefault();
		this.props.history.pushState({}, `/admin/podcasts/${data._id}`);

	}

	onRecommend(data, event) {
		event.preventDefault();
		this.setState({
			recommending: true,
			recommendData: data
		});
	}

	cancelRecommend() {
		event.preventDefault();
		this.setState({
			recommending: false
		});
	}

	confirmRecommend(event) {
		event && event.preventDefault();
		const recommendAt = this.state.recommendAt;
		this.props.recommendPodcast({
				podcasts: {
					_id: 1,
					isRecommended: {
						stateType: 1,
						recommendAt: 1
					}
				}
			}, this.state.recommendData, recommendAt)
			.done();
		this.setState({
			recommending: false
		});

	}

	onAddNew(newPodcast) {
		this.props
			.addPodcast({podcasts: Podcasts.fragments.podcasts}, newPodcast)
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

	handleDateSelect(date) {
		this.setState({
			recommendAt: date
		});
	}

	render() {
		return (
			<div>
				<Podcasts
					{...this.props}
					{...this.state}
					onCloseLightbox={::this.onCloseLightbox}
					onAddNew={::this.onAddNew}
					onAddNewClick={::this.onAddNewClick}
					onViewCommentReport={::this.onViewCommentReport}
					onViewPhotoReport={::this.onViewPhotoReport}
					onViewReport={::this.onViewReport}
					onPreview={::this.onPreview}
					onRemove={::this.onRemove}
					onEdit={::this.onEdit}
					onRecommend={::this.onRecommend}
				/>
				{this.renderViewCommentReport()}
				{this.renderViewPhotoReport()}
				{this.renderViewReport()}
				{this.renderPreviewing()}
				{this.renderRemoving()}
				{this.renderRecommending()}

			</div>
		);
	}

	renderViewCommentReport() {
		if (this.state.commentReportViewing) {
			let count = this.state.commentReportRelated.commentReportCount;
			let comments = JSON.parse(this.state.commentReportRelated.commentReportInfo).comments;
			return (
				<Lightbox className="small" header={false} headerWithoutBorder={true}
						  onClose={this.cancelViewCommentReport.bind(this)}>
					<div>评论被举报 {count} 次</div>
					<div className='centered'>
						<table className="table table-bordered table-hover dataTables-example dataTable" role="grid">
							<thead>
							<tr>
								<th>被举报评论</th>
								<th>举报次数</th>
								<th>操作</th>
							</tr>
							</thead>
							<tbody>
							{comments.map((comment) => <tr><td>{comment.content}</td><td>{comment.reportUsers.length}</td><td><a href='#'><span>删除(未做)</span></a></td></tr>)}
							</tbody>
						</table>
					</div>
				</Lightbox>

			);
		}
	}
	renderViewPhotoReport() {
		if (this.state.photoReportViewing) {
			let photos = JSON.parse(this.state.photoReportRelated.photoReportInfo).photos;
			return (
				<Lightbox  header={false} headerWithoutBorder={true}
						   onClose={this.cancelViewPhotoReport.bind(this)}>
					<div className='centered'>
						<table className="table table-bordered dataTables-example dataTable" role="grid">
							<tbody>
							{photos.map(this.renderViewPhotoReportItem, this)}
							</tbody>
						</table>
					</div>
				</Lightbox>

			);
		}
	}

	renderViewPhotoReportItem(photo) {

		let reportReasonCount = Utils.resolveReportReason(photo.reportUsers);
		return (
			<tr>
				<td style={{ maxHeight: '200px' }}>
					<div className="feed-element">
						<a href="#" className="pull-left">
							<img alt="image" className="img-circle" src={photo.owner.avatar} />
						</a>
						<div className="media-body">
							{photo.owner.nickname}
							<br/>
							{photo.createdAt}
						</div>
					</div>
				</td>
				<td style={{ maxHeight: '200px' }}><img src={photo.content[0].img} style={{ maxWidth: '200px' }}/></td>
				<td style={{ maxHeight: '200px' }}>
					<table className="table table-bordered" role="grid">
						<thead>
						<tr>
							<th>举报原因</th>
							<th>举报次数</th>
						</tr>
						</thead>
						<tbody>
						{reportReasonCount.map((item) => <tr><td>{item.label}</td><td>{item.count}</td></tr>)}
						</tbody>
					</table>
				</td>
				<td>
					<a href='#'>
						<span>删除(未做)</span>
					</a>
				</td>
			</tr>

		);
	}

	renderViewReport() {
		if (this.state.reportViewing) {
			let count = this.state.reportRelated.reportCount;
			let reportReasonCount = JSON.parse(this.state.reportRelated.reportInfo).reportReasonCount;
			return (
				<Lightbox className='xs' header={false} headerWithoutBorder={true}
						  onClose={this.cancelViewReport.bind(this)}>
					<div className='centered'>
						<div>妙招被举报{count}次</div>
						<table className="table table-bordered table-hover dataTables-example dataTable" role="grid">
							<thead>
							<tr>
								<th>举报原因</th>
								<th>举报次数</th>
							</tr>
							</thead>
							<tbody>
							{reportReasonCount.map((item) => <tr><td>{item.label}</td><td>{item.count}</td></tr>)}
							</tbody>
						</table>
					</div>
				</Lightbox>

			);
		}
	}

	renderPreviewing() {
		if (this.state.previewing) {
			return (
				<Lightbox className='xs' header={false} headerWithoutBorder={true}
						  onClose={this.cancelPreview.bind(this)}>
					<div className='centered'>
						<QRCode
							value={ 'http://share.iyuanzi.net/events/' + this.state.previewData._id +'/view?version=v2'}/>
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


	renderRecommending() {
		if (this.state.recommending) {
			if (this.state.recommendData.isRecommended.stateType !== '未上线') {
				this.confirmRecommend();
			} else {
				return (
					<Lightbox className='calendar' header={false} headerWithoutBorder={true}
							  onClose={this.cancelRecommend.bind(this)}>
						<div className='centered'>
							<Calendar
								onInit={this.handleDateSelect.bind(this)}
								onChange={this.handleDateSelect.bind(this)}
							/>
							<a className='button button-alert margined' href='#'
							   onClick={this.confirmRecommend.bind(this)}>确定</a>
						</div>
					</Lightbox>

				);
			}

		}
	}
}
