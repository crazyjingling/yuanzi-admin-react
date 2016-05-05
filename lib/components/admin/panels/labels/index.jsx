import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Search from '../../../search';
import Lightbox from '../../../lightbox';
import Pagination from '../../../pagination';
import ListTable from './list-table';
import Edit from './edit';
import options from './options';

import {labelConfig} from '../../../../containers/admin/containerInitConfig'
export default class Labels extends Component {
	static fragments = mergeFragments({
		labelsCount: {
			count: 1
		}
	}, ListTable.fragments)

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		labels: PropTypes.array,
		showFields: PropTypes.array.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number,
		removeLabel: PropTypes.func.isRequired,
		addLabel: PropTypes.func.isRequired,
		updateLabel: PropTypes.func.isRequired,
		onAddNew: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		label: PropTypes.object.isRequired,
		onEdit: PropTypes.func.isRequired,
		onEditClose: PropTypes.func.isRequired,
		edit: PropTypes.boolean,
		editingColor: PropTypes.boolean,
		history: PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired
	}


	render() {
		return (
			<div>
				<div className="ibox-content m-b-sm border-bottom">
					{this.renderSearch()}
				</div>
				<div className="ibox-content">
					<div style={{ marginBottom: 10 }}>
						<a href='#' className='btn btn-primary ' onClick={this.props.onAddNew}>
							添加标签
						</a>
					</div>
					<div className='table-responsive'>
						<div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap">

							<ListTable
								listSchema='label'
								labels={this.props.labels}
								removeLabel={this.props.removeLabel}
								showFields={this.props.showFields}
								onRemove={this.props.onRemove}
								onEdit={this.props.onEdit}
							/>
							<Pagination
								url='/admin/labels'
								query={this.props.query}
								count={this.props.count}
							/>
						</div>
					</div>
					{this.renderEdit()}
				</div>
			</div>

		);
	}

	renderEdit () {
		if (this.props.edit) {
			return (
				<Edit label={this.props.editingLabel}
					  options={options}
					  editingLabel={this.props.editingLabel}
					  onEditClose={this.props.onEditClose}
					  addLabel={this.props.addLabel}
					  updateLabel={this.props.updateLabel}
					  fragment={labelConfig.fragments}
					  onChange = {this.props.onChange}
				/>

			);
		}
	}
	renderSearch() {
		if (this.props.searchFields.length) {
			return (
				<Search
					url='/admin/labels'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
