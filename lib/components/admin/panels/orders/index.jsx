/**
 * Created by matonghe on 16/5/5.
 */
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';
import ListTable from '../../elements/table';
import Search from '../../../search';
import Pagination from '../../../pagination';
import { orderConfig } from '../../../../containers/admin/containerInitConfig';

export default class Orders extends Component {

	static propTypes = {
		orders: PropTypes.array,
		showFields: PropTypes.array.isRequired,
		passedRefund: PropTypes.func.isRequired,
		rejectRefund: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number

	};

	render() {
		return (
			<div className="ibox-content">
				<div className='table-responsive'>
					{this.renderSearch()}
						<ListTable
							listSchema='order'
							renderEntries={this.props.orders}
							showFields={this.props.showFields}
							passedRefund={this.props.passedRefund}
							rejectRefund={this.props.rejectRefund}
							fragment={orderConfig.fragments}
						/>
					<Pagination
						url='/admin/orders'
						query={this.props.query}
						count={this.props.count}
					/>
				</div>
			</div>
		);
	}

	renderSearch() {
		if (this.props.searchFields.length) {
			return (
				<Search
					url='/admin/orders'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
