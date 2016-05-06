/**
 * Created by matonghe on 16/5/5.
 */
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';
import ListTable from './list-table.jsx';
import Search from '../../../search';
import Pagination from '../../../pagination';
export default class Orders extends Component {
	static fragments = mergeFragments({
		ordersCount: {
			count: 1
		}
	}, ListTable.fragments)

	render() {
		return (
			<div className="ibox-content">

				<div className='table-responsive'>
					{this.renderSearch()}
						<ListTable
							listSchema='order'
							orders={this.props.orders}
							showFields={this.props.showFields}
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
