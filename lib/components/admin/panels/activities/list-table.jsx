import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from './table-item';
import { activityConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {
    static fragments = {
        activities: activityConfig.fragments.activity
    }

    static propTypes = {
        activities: PropTypes.array,
        removeActivity: PropTypes.func.isRequired,
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
                    {this.props.activities.map(this.renderEntry, this)}
                </tbody>
            </table>

        );
    }

    renderTh (showField) {
        return (
            <th key={showField.key}>{showField.name}</th>
        );
    }
    renderEntry (activity) {
        return (
            <TableItem listSchema={this.props.listSchema}
					   fragment={activityConfig.fragments}
					   key={activity._id}
					   itemData={activity}
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
