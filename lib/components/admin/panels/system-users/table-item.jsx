import React, {PropTypes} from 'react';
import pluck from 'lodash.pluck';
import {Component} from 'relax-framework';
import moment from 'moment';
import A from '../../../a.jsx';
import Lightbox from '../../../lightbox';
import Utils from '../../../../helpers/utils';
export default class TableItem extends Component {

	static propTypes = {
		itemData: PropTypes.object,
		showFields: PropTypes.array.isRequired,
		fragment: PropTypes.object.isRequired,
		listSchema: PropTypes.string.isRequired,
		onEdit: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onPasswordReset: PropTypes.func.isRequired
	}

	render() {
		return (
			<tr>
				{this.props.showFields.map(this.renderItem, this)}
			</tr>
		);
	}

	renderItem(showField) {
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
		if (showField.fieldsType && showField.fieldsType === 'array.object') {
			field = pluck(field, showField.showKey).join(',');
		}

		let inner;
		switch (type) {
			case 'avatar':
				inner = <Avatar avatar={field} userId={data.owner._id}/>;
				break;
			case 'image':
				inner = field !== '无' ? <img src={field} style={{ maxWidth: '40px' }}/> :
					<img style={{ maxWidth: '40px' }}/>;
				break;
			case 'image.circle':
				inner = field !== '无' ? <img className="img-circle" src={field} style={{ maxWidth: '40px' }}/> :
					<img className="img-circle" style={{ maxWidth: '40px' }}/>;
				break;
			case 'text':
				inner = field || '无';
				break;
			case 'number':
				inner = field ? field : 0;
				break;
			case 'array.button':
				inner = showField.options.map((option) => {
					if(option.value === 'isDel'){
						option.name = data.isDel === '正常' ? '封号' : '解封';
					}
					if(showField.key === 'talentInfo' && data.talentStatus !== 'waitting'){
						return '无';

					}else{
						return (
							<a href='#' onClick={this.props[option.action].bind(this, data)}>
								<span>{option.name}</span>
							</a>
						)
					}
				});
				break;
			default:
				inner = field;
		}

		return <td key={showField.key} style={{ maxWidth: '100px', overflow: 'auto'}}>{inner}</td>;

	}

}
