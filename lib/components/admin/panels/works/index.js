/**
 * Created by matonghe on 16/5/16.
 */
/**
 * Created by matonghe on 16/5/5.
 */
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';
import ListTable from '../../elements/table';
import Search from '../../../search';
import Pagination from '../../../pagination';
import { workConfig } from '../../../../containers/admin/containerInitConfig';

export default class Works extends Component {

	static propTypes = {
		works: PropTypes.array,
		showFields: PropTypes.array.isRequired,
		history: PropTypes.object.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number,
		onEdit: PropTypes.func.isRequired

	};

	render() {
		return (
			<div className="ibox-content">
				<div className='table-responsive'>
					{this.renderSearch()}
					<ListTable
						listSchema='work'
						renderEntries={this.props.works}
						showFields={this.props.showFields}
						fragment={workConfig.fragments}
						onEdit= {this.props.onEdit}
					/>
					<Pagination
						url='/admin/works'
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
					url='/admin/works'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
