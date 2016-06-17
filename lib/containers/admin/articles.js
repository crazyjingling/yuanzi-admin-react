/**
 * Created by matonghe on 16/6/16.
 */
/**
 * Created by matonghe on 16/6/15.
 */
import * as articlesActions from '../../client/actions/articles';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables, mergeFragments} from 'relax-framework';
import Utils from '../../helpers/utils';
import queryProps from '../../decorators/query-props';
import Articles from '../../components/admin/panels/articles';
import {articleConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import DatePicker from '../../components/data-types/date-picker';
import countBy from 'lodash.countby';
@connect(
	(state) => ({
		articles: state.articles.data.items,
		count: state.articles.data.count
	}),
	(dispatch) => bindActionCreators(articlesActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'desc'
})
export default class ArticlesContainer extends Component {
	static fragments = mergeFragments({
		articlesCount: {
			count: 1
		}
	}, {articles: articleConfig.fragments.article});
	static panelSettings = articleConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		articles: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		lightbox: PropTypes.any,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		removeArticle: PropTypes.func.isRequired,
	}

	getInitState() {
		return {
			searchValues: articleConfig.searchValues || {},
			lightbox: false,
			removing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				articles: {
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
		this.props.removeArticle({
				article: {_id: 1}
			}, this.state.removeData._id)
			.done();
		this.setState({
			removing: false
		});

	}

	onCloseLightbox() {
		this.setState({
			lightbox: false
		});
	}

	handleDateSelect(id, date) {
		this.setState({
			recommendAt: date
		});
	}

	render() {
		return (
			<div>
				<Articles
					{...this.props}
					{...this.state}
					onCloseLightbox={::this.onCloseLightbox}
					onRemove={::this.onRemove}
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
