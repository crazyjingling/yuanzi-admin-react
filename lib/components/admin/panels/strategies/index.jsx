import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Search from '../../../search';
import Pagination from '../../../pagination';
import ListTable from '../../elements/table';

export default class Strategies extends Component {

    static propTypes = {
        breadcrumbs: PropTypes.array.isRequired,
        strategies: PropTypes.array,
        showFields: PropTypes.array.isRequired,
        searchFields: PropTypes.array.isRequired,
        searchValues: PropTypes.object.isRequired,
        query: PropTypes.object,
        count: PropTypes.number,
        lightbox: PropTypes.boolean,
        removeStrategy: PropTypes.func.isRequired,
		onViewCommentReport: PropTypes.func.isRequired,
		onViewPhotoReport: PropTypes.func.isRequired,
		onViewReport: PropTypes.func.isRequired,
		onPreview: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
		onRecommend: PropTypes.func.isRequired,
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

					        <ListTable
						        listSchema='strategy'
								renderEntries={this.props.strategies}
						        removeStrategy={this.props.removeStrategy}
						        showFields={this.props.showFields}
						        onViewCommentReport={this.props.onViewCommentReport}
						        onViewPhotoReport={this.props.onViewPhotoReport}
						        onViewReport={this.props.onViewReport}
						        onPreview={this.props.onPreview}
						        onRemove={this.props.onRemove}
						        onEdit={this.props.onEdit}
						        onRecommend={this.props.onRecommend}
					        />
					        <Pagination
						        url='/admin/strategies'
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
					url='/admin/strategies'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
