import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from './table-item';
import { strategyConfig } from '../../../../containers/admin/containerInitConfig';

export default class ListTable extends Component {
    static fragments = {
        strategies: strategyConfig.fragments.strategy
    }

    static propTypes = {
        strategies: PropTypes.array,
        removeStrategy: PropTypes.func.isRequired,
        showFields: PropTypes.array.isRequired,
		listSchema: PropTypes.string.isRequired,
		onViewPhotoReport: PropTypes.func.isRequired,
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
					   onViewPhotoReport={this.props.onViewPhotoReport}
					   onPreview={this.props.onPreview}
					   onRemove={this.props.onRemove}
					   onEdit={this.props.onEdit}
					   onRecommend={this.props.onRecommend}
			/>
        );
    }
}
