import {Component} from 'relax-framework';
import Input from '../../../data-types/input';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Lightbox from '../../../lightbox';
import OptionsList from '../../../options-list';
import Joi from 'joi';
import validation from 'react-validation-mixin'; //import the mixin
import strategy from 'joi-validation-strategy'; //choose a validation strategy
import keys from 'lodash.keys';
import {connect} from 'react-redux';
import * as labelsActions from '../../../../client/actions/label';
import {bindActionCreators} from 'redux';

import ImagePicker from '../../../../containers/data-types/image-picker'
@connect(
	(state) => ({
		label: state.label.data,
		errors: state.label.errors
	}),
	(dispatch) => ({
		...bindActionCreators(labelsActions, dispatch),
	})
)
export class EditLabel extends Component {
	static panelSettings = {
		activePanelType: 'labels',
		breadcrumbs: [
			{
				link: '/admin/labels'
			}
		]
	}
	static validatorSchema = {
		title: Joi.string().min(3).required().label('标题')
	};

	validatorTypes() {
		return {
			title: Joi.string().required().label('标题')
		}
	}

	getValidatorData() {
		return {
			title: findDOMNode(this.refs.title).value
		};
	}

	static propTypes = {
		label: React.PropTypes.object,
		fragment: React.PropTypes.object,
		options: React.PropTypes.array,
		onEditClose: React.PropTypes.func.isRequired,
		addLabel: React.PropTypes.func.isRequired,
		updateLabel: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired
	}

	getInitState() {
		return {
			label: this.props.editingLabel ? this.props.editingLabel:{
				'cover':{
					_id:'',
					ossUrl:''
				}
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.label != this.state.label) {
			this.setState({ label: nextProps.label })
		}
	}

	renderHelpText(messages) {
		//return (
		//	<span className="help-block has-error">{messages.map(this.renderMessage, this)}</span>
		//);
	}

	renderMessage(message) {
		var i = 0;
		return (
			<span className="help-block has-error" key={i++}>{message}</span>
		);
	}

	closeEdit() {
		this.props.onEditClose();
	}

	onChange(id, event) {
		let value = event.target.value;
		let label = this.state.label;

		switch (id) {
			case 'title':{
				label.title = value;
				this.setState({ label: label });
				break;
			}
			case 'type':{
				label.type = value;
				this.setState({ label: label });
				break;
			}
			case 'display':{
				label.display = value;
				this.setState({ label: label });
				break;
			}
			default:
				this.props.onChange(id, value);
				break;
		}
	}
// cover
	onImageChange(mediaItem) {
		this.props.onChange('cover', {
			_id: mediaItem._id,
			ossUrl: mediaItem.ossUrl
		});
	}

	onSubmit() {
		event.preventDefault();
		let label = this.state.label;
		if (label._id) {
			this.props.updateLabel(this.props.fragment, label).then(() => this.closeEdit());
		} else {
			this.props.addLabel(this.props.fragment, label).then(() => this.closeEdit());
		}
	}

	render() {
		var isNew = this.state.label._id ? false : true;
		var title = isNew ? '添加标签' : '编辑 ' + this.state.label.title;
		var btn = isNew ? '添加' : '保存';
		return (
			<Lightbox className='small' onClose={this.props.onEditClose} title={title}>
				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="form-group">
						<label htmlFor='title'>标题</label>
						<input ref='title' type='text' className='form-control'
							   onChange={this.onChange.bind(this,'title')}
							   value={this.state.label.title}/>
						{this.renderHelpText(this.props.getValidationMessages('title'))}
					</div>
					<div className="form-group">
						<label htmlFor='type'>分类</label>
						<select ref='type' className='select2_demo_1 form-control'
								value={this.state.label.type}
								onChange={this.onChange.bind(this,'type')}>
							<option value='classify'>妙招攻略分类</option>
							<option value='userAssortment'>用户分类</option>
						</select>
						{this.renderHelpText(this.props.getValidationMessages('type'))}
					</div>
					<div className="form-group">
						<label className="control-label" htmlFor='cover'>封面</label>
							<ImagePicker ref="cover" value={this.state.label.cover._id||""}
										 widthAndHeightStyle={{width: '140', height: '140'}}
										 onChange={::this.onImageChange}
							/>
							{this.renderHelpText(this.props.imageEmptyMessage)}
					</div>
					<div className="form-group">
						<label className="control-label">是否显示</label>
						<select ref='display' className='select2_demo_1 form-control'
								value={this.state.label.display}
								onChange={this.onChange.bind(this,'display')}>
								<option value='true' >显示</option>
								<option value='false' >不显示</option>
						</select>
					</div>
					<a className='btn btn-primary' href='#' onClick={this.onSubmit.bind(this)}>{btn}</a>
				</form>
			</Lightbox>
		);
	}
}
export default validation(strategy)(EditLabel);
