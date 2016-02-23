import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from '../../elements/table-item';
import { strategyConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {
    static fragments = {
        strategies: strategyConfig.fragments.strategy
    }

    static propTypes = {
        strategies: PropTypes.array,
        removeStrategy: PropTypes.func.isRequired,
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
                    {this.props.strategies.map(this.renderEntry, this)}
                </tbody>
            </table>

        );
    }

    renderTh (showField) {
        return (
            <th key={showField.key}>{showField.name}</th>
        );
    }
    renderEntry (strategy) {
        return (
            <TableItem listSchema={this.props.listSchema}
					   fragment={strategyConfig.fragments}
					   key={strategy._id}
					   itemData={strategy}
					   showFields={this.props.showFields}
					   removeStrategy={this.props.removeStrategy}
			/>
        );
    }
}
