/**
 * Created by matonghe on 16/6/16.
 */
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';
import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Search from '../../../search';
import Lightbox from '../../../lightbox';
import Pagination from '../../../pagination';
import ListTable from '../../elements/table';

export default class Circles extends Component {

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		circles: PropTypes.array,
		showFields: PropTypes.array.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number,
		lightbox: PropTypes.boolean,
		removeCircle: PropTypes.func.isRequired,
		onAddNew: PropTypes.func.isRequired,
		onAddNewClick: PropTypes.func.isRequired,
		onCloseLightbox: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
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
								listSchema='circle'
								renderEntries={this.props.circles}
								removeCircle={this.props.removeCircle}
								showFields={this.props.showFields}
								onRemove={this.props.onRemove}
								onEdit={this.props.onEdit}
							/>
							<Pagination
								url='/admin/circles'
								query={this.props.query}
								count={this.props.count}
							/>
						</div>
					</div>
					{this.renderLightbox()}

				</div>
			</div>

		);
	}

	renderLightbox() {
		if (this.props.lightbox) {
			return (
				<Lightbox className='small' title='Add circle' onClose={this.props.onCloseLightbox}>
					<New onSubmit={this.props.onAddNew}/>
				</Lightbox>
			);
		}
	}
	renderSearch() {
		if (this.props.searchFields.length) {
			return (
				<Search
					url='/admin/circles'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
