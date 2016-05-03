import React from 'react';
import {Component} from 'relax-framework';
import {findDOMNode} from 'react-dom';
import pluck from 'lodash.pluck';

import OwnerPick from '../../../../containers/data-types/owner-picker';
import LabelPickerByType from '../../../../containers/data-types/labelPickerByType';
import Lightbox from '../../../lightbox';
import Joi from 'joi';
import validation from 'react-validation-mixin'; //import the mixin
import validateStrategy from 'joi-validation-strategy'; //choose a validation topic
import ImagePicker from '../../../../containers/data-types/image-picker'
import StrategySearch from '../../../../containers/data-types/strategy-search';


class Topic extends Component {

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
		topic: React.PropTypes.object.isRequired,
		user: React.PropTypes.object.isRequired,
		isNew: React.PropTypes.bool.isRequired,
		onChange: React.PropTypes.func.isRequired,
		onCreate: React.PropTypes.func.isRequired,
	}

	getInitState() {
		return {
			imageEmptyMessage: [],
			ownerEmptyMessage: [],
			labelsSelectting: false,
		};
	}

	onChange(id, event) {
		let value = event.target.value;
		switch (id) {
			case 'owner':
				value = {
					_id: event.target.value,
					nickname: event.target.selectedOptions[0].label
				};
				this.props.onChange(id, value);
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

	onSelectLabels() {
		this.setState({labelsSelectting: true});
	}

	confirmSelectLabels(selectedLabels) {
		this.setState({labelsSelectting: false});
		this.props.onChange('labels', selectedLabels);
	}

	closeLightbox() {
		this.setState({
			labelsSelectting: false
		});
	}

	onSave() {
		event.preventDefault();
		const onValidate = (error) => {
			if (!error) {
				var newData = this.props.topic;
				if (!newData.owner._id) {
					this.setState({ownerEmptyMessage: ['作者不能为空']});
				} else if (!newData.cover._id) {
					this.setState({imageEmptyMessage: ['封面不能为空']});
				} else {
					this.props.onCreate(newData);
				}

			}
		};
		this.props.validate(onValidate);
	}

	render() {
		return (
			<div>
				<div>
					<div className="row">
						<div className="col-lg-12">
							<div className='admin-scrollable ibox float-e-margins'>
								<div className='white-options list ibox-content'>
									<form className="form-horizontal" onSubmit={this.props.onCreate.bind(this)}>
										<div>
											<input type='text' hidden/>
										</div>
										{this.renderBasic()}
										<div className="hr-line-dashed"></div>
										<div className="form-group">

											<div className="col-sm-4 col-sm-offset-2">
												<a className='btn btn-primary' href='#'
												   onClick={this.onSave.bind(this)}>保存</a>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.renderLabelPickerByType()}
			</div>
		);
	}

	renderBasic() {
		return (
			<div>
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='title'>作者</label>
					<div className="col-lg-10">
						<OwnerPick user={this.props.user}
								   option={{id: 'owner', isNullShow: true}}
								   value={this.props.topic.owner._id}
								   otherValues={{label: this.props.topic.owner.nickname, value: this.props.topic.owner._id}}
								   onChange={::this.onChange}
						/>
						{this.renderHelpText(this.state.ownerEmptyMessage)}
					</div>
				</div>
				<div className="hr-line-dashed"></div>
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='title'>标题</label>
					<div className="col-lg-10">
						<input ref='title' type='text' className='form-control'
							   onChange={this.onChange.bind(this,'title')}
							   value={this.props.topic.title}/>
						{this.renderHelpText(this.props.getValidationMessages('title'))}
					</div>
				</div>
				<div className="hr-line-dashed"></div>
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='subTitle'>副标题</label>
					<div className="col-lg-10">
						<input ref='subTitle' type='text' className='form-control'
							   onChange={this.onChange.bind(this,'subTitle')}
							   value={this.props.topic.subTitle}/>
					</div>
				</div>
				<div className="hr-line-dashed"></div>
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='labels'>标签</label>
					<div className="col-lg-10">
						<div className="input-group">
							<input ref='labels' type='text' className='form-control'
							       value={pluck(this.props.topic.labels, 'title')}/>
											<span className="input-group-btn">

												<button className="btn btn-primary" type="button"
												        onClick={::this.onSelectLabels}>
													+
												</button>
											</span>
						</div>
					</div>
				</div>
				<div className="hr-line-dashed"></div>
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='cover'>封面</label>
					<div className="col-lg-10">
						<ImagePicker ref="cover" value={this.props.topic.cover._id}
									 width={140} height={140}
									 widthAndHeightStyle={{width: '140px', height: '140px'}}
									 onChange={::this.onImageChange}
						/>
						{this.renderHelpText(this.state.imageEmptyMessage)}
					</div>
				</div>
				<div className="hr-line-dashed"></div>
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='strategies'>添加妙招</label>
					<div className="col-lg-10">
						<StrategySearch selectedStrategies={this.props.topic.strategies}
										onChange={this.props.onChange}
						/>
					</div>
				</div>
			</div>
		)
	}


	// 验证出错时显示错误信息
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

	// 标签选择
	renderLabelPickerByType() {
		if (this.state.labelsSelectting) {
			return (
				<Lightbox className='small' header={false} headerWithoutBorder={true}
						  onClose={this.closeLightbox.bind(this)}>
					<div className='centered'>
						<LabelPickerByType
							labelsType='classify'
							selectedLabels={this.props.topic.labels}
							onConfirm={::this.confirmSelectLabels}
						/>
					</div>
				</Lightbox>
			);
		}

	}

}
export default validation(validateStrategy)(Topic);
