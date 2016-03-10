import {Component} from 'relax-framework';
import Input from '../../../data-types/input';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Lightbox from '../../../lightbox';
import OptionsList from '../../../options-list';
import Joi from 'joi';
import validation from 'react-validation-mixin'; //import the mixin
import strategy from 'joi-validation-strategy'; //choose a validation strategy
import classnames from 'classnames';
import keys from 'lodash.keys';
import LabelPicker from '../../../../containers/data-types/label-picker';
import Combobox from '../../../../components/data-types/combobox';

export class EditLabel extends Component {
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
		editingLabel: React.PropTypes.object.isRequired,
		options: React.PropTypes.array,
		onEditClose: React.PropTypes.func.isRequired,
		addLabel: React.PropTypes.func.isRequired,
		updateLabel: React.PropTypes.func.isRequired,
		fragment: React.PropTypes.object.isRequired
	}

	getInitState() {
		return {
			editingLabel: this.props.editingLabel || {
				title: '',
				type: 'cardTopicAssortment',
				ownedType: 'all',
				display: false,
				color: '#FC6e51'
			}
		};
	}

	renderHelpText(messages) {
		return (
			<span className="help-block has-error">{messages.map(this.renderMessage, this)}</span>
		);
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
		const editingLabel = this.state.editingLabel;
		if (id.label) {
			editingLabel[id.id || id] = {};
			editingLabel[id.id || id]._id = id.value;
			editingLabel[id.id || id].title = id.label;
		} else {
			editingLabel[id.id || id] = id.value || event.target.value;

		}
		this.setState({
			editingLabel: editingLabel
		});
	}


	onSubmit() {
		event.preventDefault();
		const onValidate = (error) => {
			if (!error) {

				let editingLabel = this.state.editingLabel;
				if (editingLabel._id) {
					this.props.updateLabel(this.props.fragment, editingLabel).then(() => this.closeEdit());
				} else {
					this.props.addLabel(this.props.fragment, editingLabel).then(() => this.closeEdit());
				}
				this.closeEdit();

			}
		};
		this.props.validate(onValidate);
	}

	render() {
		var isNew = this.props.editingLabel ? false : true;
		var title = isNew ? '添加标签' : '编辑 ' + this.state.editingLabel.title;
		var btn = isNew ? '添加' : '保存';

		return (
			<Lightbox className='small' onClose={this.props.onEditClose} title={title}>
				<form onSubmit={this.onSubmit.bind(this)}>
					<div>
						<label htmlFor='title'>标题</label>
						<input ref='title' type='text' className='form-control'
							   onChange={this.onChange.bind(this,'title')}
							   value={this.state.editingLabel.title}/>
						{this.renderHelpText(this.props.getValidationMessages('title'))}
					</div>
					<div>
						<label htmlFor='type'>分类</label>
						<select ref='type' className='select2_demo_1 form-control'
								value={this.props.editingLabel.type}
								onChange={this.onChange.bind(this,'type')}>
							<option value='cardTopicAssortment'>妙招&话题标签</option>
							<option value='userAssortment'>达人标签</option>
						</select>
						{this.renderHelpText(this.props.getValidationMessages('type'))}
					</div>
					<div>
						<LabelPicker onChange={::this.onChange}
									 value={this.state.editingLabel.ownedType ? this.state.editingLabel.ownedType._id : 'all'}
									 labelsType={['classify']}
									 option={{
										id: 'ownedType',
										label: '所属标签分类',
										isAllShow: true
									}}
						/>
						{this.renderHelpText(this.props.getValidationMessages('ownedType'))}
					</div>
					<div>
						<Combobox onChange={::this.onChange}
								  value={this.state.editingLabel.display}
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
