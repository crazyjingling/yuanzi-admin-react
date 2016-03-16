import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from './table-item';
import { feedbackConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {
    static fragments = {
        feedbacks: feedbackConfig.fragments.feedback
    }

    static propTypes = {
        feedbacks: PropTypes.array,
        showFields: PropTypes.array.isRequired,
		onViewImages: PropTypes.func.isRequired,
		listSchema: PropTypes.string.isRequired,
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
                    {this.props.feedbacks.map(this.renderEntry, this)}
                </tbody>
            </table>

        );
    }

    renderTh (showField) {
        return (
            <th key={showField.key}>{showField.name}</th>
        );
    }
    renderEntry (feedback) {
        return (
            <TableItem listSchema={this.props.listSchema}
					   fragment={feedbackConfig.fragments}
					   key={feedback._id}
					   itemData={feedback}
					   showFields={this.props.showFields}
					   onViewImages={this.props.onViewImages}
			/>
        );
    }
}
