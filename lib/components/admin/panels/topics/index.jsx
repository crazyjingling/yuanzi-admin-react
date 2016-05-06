import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Search from '../../../search';
import Lightbox from '../../../lightbox';
import New from './new';
import Pagination from '../../../pagination';
import ListTable from './list-table.jsx';

export default class Topics extends Component {
    static fragments = mergeFragments({
        topicsCount: {
            count: 1
        }
    }, ListTable.fragments)

    static propTypes = {
        breadcrumbs: PropTypes.array.isRequired,
        topics: PropTypes.array,
        showFields: PropTypes.array.isRequired,
        searchFields: PropTypes.array.isRequired,
        searchValues: PropTypes.object.isRequired,
        query: PropTypes.object,
        count: PropTypes.number,
        lightbox: PropTypes.boolean,
        removeTopic: PropTypes.func.isRequired,
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
		        <div className="ibox-content  m-b-sm border-bottom">
			        {this.renderSearch()}
		        </div>
		        <div className="ibox-content">
			        <div className='table-responsive'>
				        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap">

					        <ListTable
						        listSchema='topic'
						        topics={this.props.topics}
						        removeTopic={this.props.removeTopic}
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
						        url='/admin/topics'
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
					url='/admin/topics'
					search={this.props.searchValues}
					searchFields={this.props.searchFields}
					query={this.props.query}
					history={this.props.history}
				/>
			)
		}
	}
}
