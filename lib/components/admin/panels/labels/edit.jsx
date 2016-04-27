import {Component} from 'relax-framework';
import Input from '../../../data-types/input';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Lightbox from '../../../lightbox';
import OptionsList from '../../../options-list';
import Joi from 'joi';
import validation from 'react-validation-mixin'; //import the mixin
import strategy from 'joi-validation-strategy'; //choose a validation strategy
import * as labelActions from '../../../../client/actions/label';
import classnames from 'classnames';
import keys from 'lodash.keys';
import {connect} from 'react-redux';
import Combobox from '../../../../components/data-types/combobox';
import ImagePicker from '../../../../containers/data-types/image-picker'
import { labelConfig } from '../../../../containers/admin/containerInitConfig';

export class EditLabel extends Component {
@connect(
	(state) => ({
		label: state.label.data,
		errors: state.label.errors,
	}),
	(dispatch) => ({
		...bindActionCreators(labelActions, dispatch),
	})
)
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
	static fragments = {
	label: labelConfig.fragments.label
	}
	static propTypes = {
		label: React.PropTypes.object,
		options: React.PropTypes.array,
		onEditClose: React.PropTypes.func.isRequired,
		addLabel: React.PropTypes.func.isRequired,
		updateLabel: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired
	}
	static panelSettings = {
		activePanelType: 'label',
		breadcrumbs: [
			{
				link: '/admin/labels'
			}
		]
	}

	getInitState() {
		return {
			label: this.props.value || {
				title: '',
				color: '#ffffff',
				cover:{_id: ''},
			}
		};
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
		event && event.preventDefault();
		let value = event.target.value;
		switch (id) {
			case 'template':
				this.setState({template: value});
				break;
			default:
				this.props.onChange(id, value);
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
		const onValidate = (error) => {
			if (!error) {

				let label = this.props.label;
				if (label._id) {
					this.props.updateLabel(this.constructor.fragment, label).then(() => this.closeEdit());
				} else {
					this.props.addLabel(this.constructor.fragment, label).then(() => this.closeEdit());
				}
				this.closeEdit();

			}
		};
		this.props.validate(onValidate);
	}

	render() {
		var isNew = this.props.label ? false : true;
		var title = isNew ? '添加标签' : '编辑 ' + this.props.label.title;
		var btn = isNew ? '添加' : '保存';
		return (
			<Lightbox className='small' onClose={this.props.onEditClose} title={title}>
				<form onSubmit={this.onSubmit.bind(this)}>
					<div>
						<label htmlFor='title'>标题</label>
						<input ref='title' type='text' className='form-control'
							   onChange={this.onChange.bind(this,'title')}
							   value={this.props.label.title}/>
						{this.renderHelpText(this.props.getValidationMessages('title'))}
					</div>
					<div>
						<label htmlFor='type'>分类</label>
						<select ref='type' className='select2_demo_1 form-control'
								value={this.props.label.type}
								onChange={this.onChange.bind(this,'type')}>
							<option value='classify'>攻略妙招标签</option>
							<option value='userAssortment'>达人标签</option>
							<option value='userAssortment'>关键字</option>
						</select>
						{this.renderHelpText(this.props.getValidationMessages('type'))}
					</div>
					<div className="form-group">
						<label className="col-lg-2 control-label" htmlFor='cover'>封面</label>
						<div className="col-lg-10">
							<ImagePicker ref="cover" value={this.props.label.cover._id}
										 width={140} height={140}
										 widthAndHeightStyle={{width: '140px', height: '140px'}}
										 onChange={::this.onImageChange}
							/>
							{this.renderHelpText(this.props.imageEmptyMessage)}
						</div>
					</div>
					<div>
						<Combobox onChange={::this.onChange}
								  value={this.props.label.display}
								  option={{
								  		id: 'display',
								  		label: '是否显示',
								  }}
								  labels={['不显示', '显示']}
						/>
						{this.renderHelpText(this.props.getValidationMessages('display'))}
					</div>
					<div>
						<input type='text' hidden/>
					</div>
					<a className='button button-primary' href='#' onClick={this.onSubmit.bind(this)}>{btn}</a>
				</form>
			</Lightbox>
		);
	}
}
export default validation(strategy)(EditLabel);
