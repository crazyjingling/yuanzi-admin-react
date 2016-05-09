/**
 * Created by matonghe on 16/5/5.
 */
import * as orderActions from '../../client/actions/orders';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables, mergeFragments} from 'relax-framework';
import Utils from '../../helpers/utils';
import queryProps from '../../decorators/query-props';
import {orderConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import { Calendar } from 'react-date-range';
import countBy from 'lodash.countby';
import Orders from '../../components/admin/panels/orders';
@connect(
	(state) => ({
		orders: state.orders.data.items,
		count: state.orders.data.count
	}),
	(dispatch) => bindActionCreators(orderActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'desc'
})
export default class OrdersContainer extends Component {
	static fragments = mergeFragments({
		ordersCount: {
			count: 1
		}
	}, {orders: orderConfig.fragments.order})
	static panelSettings = orderConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		orders: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		removeOrder: PropTypes.func.isRequired,
		updateOrder: PropTypes.func.isRequired,
	}

	getInitState() {
		return {
			searchValues: orderConfig.searchValues || {},
			lightbox: false,
			removing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				orders: {
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
		this.props.removeOrder({
				order: {_id: 1}
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
	onEdit(order) {
		event.preventDefault();
		this.props.updateOrder(orderConfig.fragments.order, order);

	}
	passedRefund(data){
		console.log(data);
		data.refund.refundType = 'agreed';
		this.onEdit(data);
	}
	rejectRefund(data){
		data.refund.refundType = 'rejected';
		this.onEdit(data);
	}
	handleDateSelect(date) {
		this.setState({
			recommendAt: date
		});
	}

	render() {
		return (
			<div>
				<Orders
					{...this.props}
					{...this.state}
					listSchema='order'
					onCloseLightbox={::this.onCloseLightbox}
					rejectRefund={::this.rejectRefund}
					passedRefund={::this.passedRefund}
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
