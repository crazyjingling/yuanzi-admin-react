/**
 * Created by matonghe on 16/5/5.
 */
import * as commentActions from '../../client/actions/comments';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables, mergeFragments} from 'relax-framework';
import Utils from '../../helpers/utils';
import queryProps from '../../decorators/query-props';
import {commentConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import { Calendar } from 'react-date-range';
import countBy from 'lodash.countby';
import Comments from '../../components/admin/panels/comments';
@connect(
	(state) => ({
		comments: state.comments.data.items,
		count: state.comments.data.count
	}),
	(dispatch) => bindActionCreators(commentActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: '-createdAt',
	comment: 'desc'
})
export default class CommentsContainer extends Component {
	static fragments = mergeFragments({
		commentsCount: {
			count: 1
		}
	}, {comments: commentConfig.fragments.comment});
	static panelSettings = commentConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		comments: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
	}

	getInitState() {
		return {
			searchValues: commentConfig.searchValues || {},
			lightbox: false,
			removing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				comments: {
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
		this.state.removeData.isPassed = false;
		console.log(this.state.removeData);
		this.props
			.updateComment({comment: commentConfig.fragments.comment}, this.state.removeData)
			.then(() => {
				this.onCloseLightbox();
			})
		this.setState({
			removing: false
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
				<Comments
					{...this.props}
					{...this.state}
					listSchema='comment'
					onCloseLightbox={::this.onCloseLightbox}
					removeComment={::this.onRemove}
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
