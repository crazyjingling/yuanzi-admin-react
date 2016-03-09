import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from './table-item';
import { topicConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {
    static fragments = {
        topics: topicConfig.fragments.topic
    }

    static propTypes = {
        topics: PropTypes.array,
        removeTopic: PropTypes.func.isRequired,
        showFields: PropTypes.array.isRequired,
		listSchema: PropTypes.string.isRequired,
		onViewCommentReport: PropTypes.func.isRequired,
		onViewPhotoReport: PropTypes.func.isRequired,
		onViewReport: PropTypes.func.isRequired,
		onPreview: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
		onRecommend: PropTypes.func.isRequired,
    }

    render() {
        return (
            <table className="table table-bordered table-hover dataTables-example dataTable" role="grid">
                <thead>
                <tr>
                    {this.props.showFields.map(this.renderTh, this)}
                </tr>
                </thead>
                <tbody>
                    {this.props.topics.map(this.renderEntry, this)}
                </tbody>
            </table>

        );
    }

    renderTh (showField) {
        return (
            <th key={showField.key}>{showField.name}</th>
        );
    }
    renderEntry (topic) {
        return (
            <TableItem listSchema={this.props.listSchema}
					   fragment={topicConfig.fragments}
					   key={topic._id}
					   itemData={topic}
					   showFields={this.props.showFields}
					   onViewCommentReport={this.props.onViewCommentReport}
					   onViewPhotoReport={this.props.onViewPhotoReport}
					   onViewReport={this.props.onViewReport}
					   onPreview={this.props.onPreview}
					   onRemove={this.props.onRemove}
					   onEdit={this.props.onEdit}
					   onRecommend={this.props.onRecommend}
			/>
        );
    }
}
