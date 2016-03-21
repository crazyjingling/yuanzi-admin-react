import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Search from '../../../search';
import Lightbox from '../../../lightbox';
import Pagination from '../../../pagination';
import ListTable from './list-table.jsx';

export default class Users extends Component {
	static fragments = mergeFragments({
		usersCount: {
			count: 1
		}
	}, ListTable.fragments)

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		users: PropTypes.array,
		showFields: PropTypes.array.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number,
		onEdit: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onPasswordReset: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired
	}

	render() {
		return (
			<div className="ibox-content">
				<div className='table-responsive'>
					<div id="DataTables_Table_0_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
						{this.renderSearch()}
						<ListTable
							listSchema='user'
							users={this.props.users}
							showFields={this.props.showFields}
							onEdit={this.props.onEdit}
							onRemove={this.props.onRemove}
							onPasswordReset={this.props.onPasswordReset}
						/>
						<Pagination
							url='/admin/users'
							query={this.props.query}
							count={this.props.count}
						/>
					</div>
				</div>
			</div>
		);
	}
	renderSearch() {
		if (this.props.searchFields.length) {
			return (
				<Search
					url='/admin/users'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
