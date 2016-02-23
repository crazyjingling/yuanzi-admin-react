import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from '../../elements/table-item';
import { labelConfig } from '../../../../containers/admin/containerInitConfig';


export default class ListTable extends Component {
    static fragments = {
        labels: labelConfig.fragments.label
    }

    static propTypes = {
        labels: PropTypes.array,
        removeLabel: PropTypes.func.isRequired,
        showFields: PropTypes.array.isRequired,
		listSchema: PropTypes.string.isRequired
    }

    render() {
        return (
            <table className="table table-striped table-bordered table-hover dataTables-example dataTable" id="editable" role="grid">
                <thead>
                <tr>
                    {this.props.showFields.map(this.renderTh, this)}
                </tr>
                </thead>
                <tbody>
                    {this.props.labels.map(this.renderEntry, this)}
                </tbody>
            </table>

        );
    }

    renderTh (showField) {
        return (
            <th key={showField.key}>{showField.name}</th>
        );
    }
    renderEntry (label) {
        return (
            <TableItem listSchema={this.props.listSchema}
					   fragment={labelConfig.fragments}
					   key={label._id}
					   itemData={label}
					   showFields={this.props.showFields}
					   removeLabel={this.props.removeLabel}
			/>
        );
    }
}
