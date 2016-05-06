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
		onViewCommentReport: PropTypes.func.isRequired,
		onViewPhotoReport: PropTypes.func.isRequired,
		onViewReport: PropTypes.func.isRequired,
		onPreview: PropTypes.func,
		onRemove: PropTypes.func,
		onEdit: PropTypes.func,
		onRecommend: PropTypes.func,
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
				inner = field !== '无' ? <img src={field} style={{ maxWidth: '50px',width: 50, height: 50, objectFit: 'cover' }}/> :
					<img style={{ maxWidth: '50px', width: 50, height: 50, objectFit: 'cover' }}/>;
				break;
			case 'image.circle':
				inner = field !== '无' ? <img className="img-circle" src={field} style={{ maxWidth: '40px' }}/> :
					<img className="img-circle" style={{ maxWidth: '40px' }}/>;
				break;
			case 'tag':
			{

				inner = (
					<ul className="tag-list" style={{ padding: 0 }}>
						{field.split(',').map((f) => {
							return f? <li><a><i className="fa fa-tag" />{f}</a></li>: ''
						})}
					</ul>
				);
				break;
			}
			case 'text':
				inner = field || '无';
				break;
			case 'number':
				inner = field ? field : 0;
				break;
			case 'array.button':
				inner = showField.options.map((option) => {
					if(option.value === 'recommend'){
						option.name = data.isRecommended.stateType === '未上线' ? '上线' : '下线';
					}
					return (
						<button style={{ fontSize: 12 }}className="btn-white btn btn-xs" href='#' onClick={this.props[option.action].bind(this, data)}>
							{option.name}
						</button>
					)
				});
				inner = <div className="btn-group">{inner}</div>
				break;
			default:
				inner = field;
		}
		if (showField.key.indexOf('photoReportCount') !== -1 && data.photoReportRelated.photoReportCount) {
			inner =
				<a href='#' onClick={this.props.onViewPhotoReport.bind(this, data.photoReportRelated)}>
					<span>{data.photoReportRelated.photoReportCount}</span>
				</a>
		}
		if (showField.key.indexOf('reportCount') !== -1 && data.reportRelated.reportCount) {
			inner =
				<a href='#' onClick={this.props.onViewReport.bind(this, data.reportRelated)}>
					<span>{data.reportRelated.reportCount}</span>
				</a>
		}
		if (showField.key.indexOf('commentReportCount') !== -1 && data.commentReportRelated.commentReportCount) {
			inner =
				<a href='#' onClick={this.props.onViewCommentReport.bind(this, data.commentReportRelated)}>
					<span>{data.commentReportRelated.commentReportCount}</span>
				</a>
		}
		return <td key={showField.key} style={{ overflow: 'auto' }}>{inner}</td>;

	}

}
