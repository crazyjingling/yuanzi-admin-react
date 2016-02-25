import React, {PropTypes} from 'react';
import pluck from 'lodash.pluck';
import {Component} from 'relax-framework';
import moment from 'moment';
import A from '../../a';
import Lightbox from '../../lightbox';
import Utils from '../../../helpers/utils';
export default class TableItem extends Component {

    static propTypes = {
		itemData: PropTypes.object,
		onRemove: PropTypes.func,
		onEdit: PropTypes.func,
        showFields: PropTypes.array.isRequired,
		fragment: PropTypes.object.isRequired,
		listSchema: PropTypes.string.isRequired
    }

    render() {
        return (
            <tr>
                {this.props.showFields.map(this.renderItem, this)}
            </tr>
        );
    }

    renderItem (showField) {
		var data = this.props.itemData;
        var field = data;
		var type = showField.type;
		if (showField.key.indexOf('.') !== -1) {
			const keys = showField.key.split('.');
			for (let i of keys) {
				field = field && field[i];
			}
		} else {
			field = field[showField.key];
		}
		if( showField.fieldsType &&  showField.fieldsType === 'array.object'){
			field = pluck(field, showField.showKey);
		}

		let inner;
		switch (type) {
			case 'avatar':
				inner = <Avatar avatar={field} userId={data.owner._id}/>;
				break;
			case 'image':
				inner = field !== '无' ? <img src={field} style={{ maxWidth: '40px' }} /> : <img style={{ maxWidth: '40px' }} />;
				break;
			case 'text':
				inner = field || '无';
				break;
			case 'number':
				inner = field ? field : 0;
				break;
			case 'array.button':
				inner = showField.options.map((option) => {
					return (
						<a href='#' onClick={this.props[option.action].bind(this, data._id)}>
							<span>{option.name}</span>
						</a>
					)
				});
				break;
			default:
				inner = field;
		}
		return <td key={showField.key} style={{ maxWidth: '100px', overflow: 'auto'}}>{inner}</td>;

    }

}
