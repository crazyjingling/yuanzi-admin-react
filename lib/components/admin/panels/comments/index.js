/**
 * Created by matonghe on 16/5/5.
 */
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';
import ListTable from '../table';
import Search from '../../../search';
import Pagination from '../../../pagination';
import { commentConfig } from '../../../../containers/admin/containerInitConfig';
export default class Comments extends Component {

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		comments: PropTypes.array,
		showFields: PropTypes.array.isRequired,
		history: PropTypes.object.isRequired,
		searchFields: PropTypes.array.isRequired,
		searchValues: PropTypes.object.isRequired,
		query: PropTypes.object,
		count: PropTypes.number,
		removeComment: PropTypes.func.isRequired,

	}

	render() {
		return (
			<div className="ibox-content">
				<div className='table-responsive'>
					{this.renderSearch()}
					<ListTable
						listSchema='comment'
						renderEntries={this.props.comments}
						showFields={this.props.showFields}
						removeComment={this.props.removeComment}
						fragment={commentConfig.fragments}
					/>
					<Pagination
						url='/admin/comments'
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
					url='/admin/comments'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
