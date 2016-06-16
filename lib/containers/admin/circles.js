/**
 * Created by matonghe on 16/6/15.
 */
import * as circlesActions from '../../client/actions/circles';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables, mergeFragments} from 'relax-framework';
import Utils from '../../helpers/utils';
import queryProps from '../../decorators/query-props';
import Circles from '../../components/admin/panels/circles';
import {circleConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import DatePicker from '../../components/data-types/date-picker';
import countBy from 'lodash.countby';
@connect(
	(state) => ({
		circles: state.circles.data.items,
		count: state.circles.data.count
	}),
	(dispatch) => bindActionCreators(circlesActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'desc'
})
export default class CirclesContainer extends Component {
	static fragments = mergeFragments({
		circlesCount: {
			count: 1
		}
	}, {circles: circleConfig.fragments.circle});
	static panelSettings = circleConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		circles: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		lightbox: PropTypes.any,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		removeCircle: PropTypes.func.isRequired,
		updateCircle: PropTypes.func.isRequired
	}

	getInitState() {
		return {
			searchValues: circleConfig.searchValues || {},
			lightbox: false,
			removing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				circles: {
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
		this.props.removeCircle({
				circle: {_id: 1}
			}, this.state.removeData._id)
			.done();
		this.setState({
			removing: false
		});

	}

	onEdit(data, event) {
		event.preventDefault();
		this.props.history.pushState({}, `/admin/circles/${data._id}`);

	}

	onAddNew(newCircle) {
		this.props
			.addCircle({circle: Circles.fragments.circles}, newCircle)
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

	handleDateSelect(id, date) {
		this.setState({
			recommendAt: date
		});
	}

	render() {
		return (
			<div>
				<Circles
					{...this.props}
					{...this.state}
					onCloseLightbox={::this.onCloseLightbox}
					onAddNew={::this.onAddNew}
					onAddNewClick={::this.onAddNewClick}
					onRemove={::this.onRemove}
					onEdit={::this.onEdit}
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
