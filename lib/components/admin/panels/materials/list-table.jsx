import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from './table-item';
import { materialConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {
    static fragments = {
        materials: materialConfig.fragments.material
    }

    static propTypes = {
        materials: PropTypes.array,
        removeMaterial: PropTypes.func.isRequired,
        showFields: PropTypes.array.isRequired,
		listSchema: PropTypes.string.isRequired,
		onRemove: PropTypes.func.isRequired,
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
                    {this.props.materials.map(this.renderEntry, this)}
                </tbody>
            </table>

        );
    }

    renderTh (showField) {
        return (
            <th key={showField.key}>{showField.name}</th>
        );
    }
    renderEntry (material) {
        return (
            <TableItem listSchema={this.props.listSchema}
					   fragment={materialConfig.fragments}
					   key={material._id}
					   itemData={material}
					   showFields={this.props.showFields}
					   onRemove={this.props.onRemove}
			/>
        );
    }
}
