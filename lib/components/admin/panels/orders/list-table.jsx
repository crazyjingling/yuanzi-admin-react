/**
 * Created by matonghe on 16/5/5.
 */
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from '../table-item';
import { orderConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {

	//static propTypes = {
	//	orders: PropTypes.array,
	//	showFields: PropTypes.array.isRequired,
	//	listSchema: PropTypes.string.isRequired,
	//	onRemove: PropTypes.func.isRequired,
	//	onEdit: PropTypes.func.isRequired
	//}

	render() {
		return (
			<table className="table table-bordered table-hover dataTables-example dataTable" role="grid">
				<thead>
				<tr>
					{this.props.showFields.map(this.renderTh, this)}
				</tr>
				</thead>
				<tbody>
				{this.props.orders.map(this.renderEntry, this)}
				</tbody>
			</table>

		);
	}

	renderTh (showField) {
		return (
			<th key={showField.key}>{showField.name}</th>
		);
	}
	renderEntry (order) {
		return (
			<TableItem listSchema={this.props.listSchema}
					   fragment={orderConfig.fragments}
					   key={order._id}
					   itemData={order}
					   showFields={this.props.showFields}
					   passedRefund={this.props.passedRefund}
					   rejectRefund={this.props.rejectRefund}
				       listSchema={this.props.listSchema}
			/>
		);
	}
}

