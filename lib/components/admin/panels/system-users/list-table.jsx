import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from './table-item';
import { systemUserConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {
    static fragments = {
        users: systemUserConfig.fragments.user
    }

    static propTypes = {
        users: PropTypes.array.isRequired,
        showFields: PropTypes.array.isRequired,
		listSchema: PropTypes.string.isRequired,
		onEdit: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onPasswordReset: PropTypes.func.isRequired
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
                    {this.props.users.map(this.renderEntry, this)}
                </tbody>
            </table>

        );
    }

    renderTh (showField) {
        return (
            <th key={showField.key}>{showField.name}</th>
        );
    }
    renderEntry (user) {
        return (
            <TableItem listSchema={this.props.listSchema}
					   fragment={systemUserConfig.fragments}
					   key={user._id}
					   itemData={user}
					   showFields={this.props.showFields}
					   onEdit={this.props.onEdit}
					   onRemove={this.props.onRemove}
					   onPasswordReset={this.props.onPasswordReset}
			/>
        );
    }
}
