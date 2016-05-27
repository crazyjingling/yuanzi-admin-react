import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Search from '../../../search';
import Lightbox from '../../../lightbox';
import Pagination from '../../../pagination';
import ListTable from '../../elements/table';

export default class Feedbacks extends Component {


	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		feedbacks: PropTypes.array,
		onViewImages: PropTypes.func.isRequired,
		showFields: PropTypes.array.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number,
		history: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				<div className="ibox-content m-b-sm border-bottom">
					{this.renderSearch()}
				</div>
				<div className="ibox-content">
					<div className='table-responsive'>
						<div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap">

							<ListTable
								listSchema='feedback'
								renderEntries={this.props.feedbacks}
								showFields={this.props.showFields}
								onViewImages={this.props.onViewImages}
							/>
							<Pagination
								url='/admin/feedbacks'
								query={this.props.query}
								count={this.props.count}
							/>
						</div>
					</div>
				</div>
			</div>

		);
	}

	renderSearch() {
		if (this.props.searchFields.length) {
			return (
				<Search
					url='/admin/feedbacks'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
