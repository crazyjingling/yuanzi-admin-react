/**
 * Created by matonghe on 16/5/9.
 */

import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import TableItem from './table-item';

export default class ListTable extends Component {

	constructor(props) {
		super(props);
		// Operations usually carried out in componentWillMount go here
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
				{this.props.renderEntries.map(this.renderEntry, this)}
				</tbody>
			</table>

		);
	}

	renderTh (showField) {
		return (
			<th key={showField.key}>{showField.name}</th>
		);
	}
	renderEntry (renderEntry) {
		return (
			<TableItem listSchema={this.props.listSchema}
					   fragment={this.props.fragments}
					   key={renderEntry._id}
					   itemData={renderEntry}
					   showFields={this.props.showFields}
					   listSchema={this.props.listSchema}
						{...this.props}
			/>
		);
	}
}

