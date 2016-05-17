import React, {PropTypes} from 'react';
import pluck from 'lodash.pluck';
import {Component} from 'relax-framework';
import moment from 'moment';
import A from '../../a.jsx';
import Lightbox from '../../lightbox';
import Utils from '../../../helpers/utils';
export default class TableItem extends Component {


	constructor(props) {
		super(props);
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
				inner = <Avatar avatar={field} userId={data._id}/>;
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
			case 'status':
				inner = field ? <span className="label label-default">Failure</span> : <span className="label label-primary">Success</span> ;
				break;
			case 'array.button':
				inner = showField.options.map((option) => {
					if(option.value === 'isDel'){
						option.name = data.isDel === '正常' ? '封号' : '解封';
					}
					if(showField.key === 'talentInfo' && data.talentStatus !== '未提申请'){
						return (
							<button style={{ fontSize: 12 }} className="btn-white btn btn-xs" href='#' onClick={this.props[option.action].bind(this, data)}>
								<span className="label label-primary">{data.talentStatus}</span>
							</button>
						);
					}
					if(showField.key === 'talentInfo' && data.talentStatus === '未提申请'){
						return <span className="label label-default">{data.talentStatus}</span>;
					}
					if(showField.key === 'isPassed' && !data.isPassed || showField.key === 'isDelStatus' && data.isDel){
						return <span className="label label-default">已屏蔽</span>;
					}
					return (
						<button style={{ fontSize: 12 }} className="btn-white btn btn-xs" href='#' onClick={this.props[option.action].bind(this, data)}>
							<span>{option.name}</span>
						</button>
					);
				});
				inner = <div className="btn-group">{inner}</div>
				break;
			case 'gender': {
				inner = field == '男'? <span className="btn btn-outline btn-primary btn-circle"><i style={{ fontSize:'16px' }} className="fa fa-mars"/></span>
					: <span className="btn btn-outline btn-danger btn-circle"><i style={{ fontSize:'16px' }} className="fa fa-venus"/></span>
				break;
			}
			case 'label': {
				let icon = '';
				switch (field) {
					case 'QQ':
						icon = 'fa fa-qq';
						break;
					case '微信':
						icon = 'fa fa-weixin';
						break;
					case '微博':
						icon = 'fa fa-weibo';
						break;
					case '手机':
						icon = 'fa fa-mobile';
						break;
				}
				inner = <span className="btn btn-outline btn-primary btn-circle"><i style={{ fontSize:'16px' }} className={icon}/></span>
				break;
			}
			case 'workImage': {
				let image = field[0].img
				inner = field !== '无' ? <img src={image} style={{ maxWidth: '40px' }}/> :
					<img style={{ maxWidth: '40px' }}/>;
				break;
			}
			default:
				inner = field;
		}

		return <td key={showField.key} style={{ maxWidth: '100px', overflow: 'auto'}}>{inner}</td>;

	}

}
