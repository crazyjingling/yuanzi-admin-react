import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Search from '../../../search';
import Lightbox from '../../../lightbox';
import New from './new';
import Pagination from '../../../pagination';
import ListTable from '../../elements/table';

export default class Materials extends Component {

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		materials: PropTypes.array,
		showFields: PropTypes.array.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number,
		removeMaterial: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired
	}

	render() {
		return (
			<div className="ibox-content">
				<div className='table-responsive'>
					<div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap">
						{this.renderSearch()}
						<ListTable
							listSchema='material'
							renderEntries={this.props.materials}
							removeMaterial={this.props.removeMaterial}
							showFields={this.props.showFields}
							onRemove={this.props.onRemove}
						/>
						<Pagination
							url='/admin/materials'
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
					url='/admin/materials'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
