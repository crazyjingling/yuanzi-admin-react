import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';
import {findDOMNode} from 'react-dom';
import pluck from 'lodash.pluck';

import A from '../../../a';
import Animate from '../../../animate';
import NotFound from '../not-found';
import Spinner from '../../../spinner';
import TitleSlug from '../../../title-slug';
import Utils from '../../../../helpers/utils';
import OwnerPick from '../../../../containers/data-types/owner-picker';
import LabelPickerByType from '../../../../containers/data-types/labelPickerByType';
import Combobox from '../../../../components/data-types/combobox';
import Lightbox from '../../../lightbox';
import Joi from 'joi';
import validation from 'react-validation-mixin'; //import the mixin
import validateStrategy from 'joi-validation-strategy'; //choose a validation strategy
import ImagePicker from '../../../../containers/data-types/image-picker'
import Steps from './steps';
import Tools from './tools';
import Materials from './materials';


class Strategy extends Component {

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
		strategy: React.PropTypes.object.isRequired,
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
			isNextShow: false
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

	//tools materials steps等,id为这些字段,pro为要更新的数组中的字段,例如: materials, 2, title
	onListChange(id, index, pro, event) {
		let data = this.props.strategy[id];
		if (index > data.length) {
			data[index] = {};
		}
		data[index][pro] = event.target.value;
		this.props.onChange(id, data);

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

	onSave(event) {
		event.preventDefault();
		if (this.props.isNew) {
			const onValidate = (error) => {
				if (!error) {
					var newData = this.props.strategy;
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
		} else {
			if (this.state.isNextShow) {
				this.props.onCreate(this.props.strategy);
				this.setState({isNextShow: false});

			} else {
				this.setState({isNextShow: true});
			}
		}
	}

	onReturn(event) {
		event.preventDefault();
		this.setState({isNextShow: false});
	}

	render() {
		return (
			<div>
				<div>
					<div className="row">
						<div className="col-lg-12">
							<h1>添加妙招</h1>
							<hr/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3"></div>
						<div className="col-lg-6">
							<div className='admin-scrollable'>
								<div className='white-options list'>
									<form className="form-horizontal" onSubmit={this.props.onCreate.bind(this)}>
										<div>
											<input type='text' hidden/>
										</div>
										{this.renderBasic()}
										{this.renderNext()}
										<div className="text-center">
											{this.renderReturnBtn()}
											<a className='button button-primary' href='#'
											   onClick={this.onSave.bind(this)}>{(this.props.isNew || this.state.isNextShow) ? '保存' : '下一步'}</a>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3"></div>
				</div>
				{this.renderLabelPickerByType()}
			</div>
		);
	}

	renderBasic() {
		if (!this.state.isNextShow) {
			return (
				<div>
					<div className="form-group">
						<label className="col-lg-2 control-label" htmlFor='title'>作者</label>
						<div className="col-lg-10">
							<OwnerPick user={this.props.user}
									   option={{id: 'owner', isNullShow: true}}
									   value={this.props.strategy.owner._id}
									   otherValues={{label: this.props.strategy.owner.nickname, value: this.props.strategy.owner._id}}
									   onChange={::this.onChange}
							/>
							{this.renderHelpText(this.state.ownerEmptyMessage)}
						</div>
					</div>
					<div className="form-group">
						<label className="col-lg-2 control-label" htmlFor='title'>标题</label>
						<div className="col-lg-10">
							<input ref='title' type='text' className='form-control'
								   onChange={this.onChange.bind(this,'title')}
								   value={this.props.strategy.title}/>
							{this.renderHelpText(this.props.getValidationMessages('title'))}
						</div>
					</div>
					<div className="form-group">
						<label className="col-lg-2 control-label" htmlFor='subTitle'>副标题</label>
						<div className="col-lg-10">
							<input ref='subTitle' type='text' className='form-control'
								   onChange={this.onChange.bind(this,'subTitle')}
								   value={this.props.strategy.subTitle}/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-lg-2 control-label" htmlFor='type'>模板</label>
						<div className="col-lg-10">
							<Combobox onChange={::this.onChange}
									  value={this.props.strategy.type}
									  option={{
														id: 'type'
												  }}
									  labels={['动手妙招', '经验妙招']}
									  values={['动手妙招', '经验妙招']}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-lg-2 control-label" htmlFor='labels'>标签</label>
						<div className="col-lg-10">
							<div className="col-lg-11">
								<input ref='labels' type='text' className='form-control'
									   value={pluck(this.props.strategy.labels, 'title')}/>
							</div>
							<div className="col-lg-1">

								<button className="btn btn-primary btn-circle" type="button"
										onClick={::this.onSelectLabels}>
									<i className="fa fa-plus"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-lg-2 control-label" htmlFor='cover'>封面</label>
						<div className="col-lg-10">
							<ImagePicker ref="cover" value={this.props.strategy.cover._id}
										 width={140} height={140}
										 widthAndHeightStyle={{width: '140px', height: '140px'}}
										 onChange={::this.onImageChange}
							/>
							{this.renderHelpText(this.state.imageEmptyMessage)}
						</div>
					</div>
				</div>
			)
		}
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
							selectedLabels={this.props.strategy.labels}
							onConfirm={::this.confirmSelectLabels}
						/>
					</div>
				</Lightbox>
			);
		}

	}

	// ==========================================next=================================
	//显示返回按钮
	renderReturnBtn() {
		if (this.state.isNextShow) {
			return (
				<a className='button button-primary' href='#'
				   onClick={this.onReturn.bind(this)}>返回</a>
			);
		}
	}

	renderNext() {
		if (this.state.isNextShow) {
			return (
				<div>
					{this.renderMaterials()}
					{this.renderTools()}
					{this.renderInfo()}
					{this.renderAudio()}
					{this.renderSteps()}
				</div>
			);
		}

	}


	renderMaterials() {
		if (this.props.strategy.type === '动手妙招') {
			return (
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='materials'>选择材料</label>
					<div className="col-lg-10">
						<Materials type="materials" onChange={this.props.onChange}
										 existsMaterials={this.props.strategy.materials}/>
					</div>
				</div>
			);
		}
	}

	renderTools() {
		if (this.props.strategy.type === '动手妙招') {

			return (
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='tools'>选择工具</label>
					<div className="col-lg-10">
						<Tools type="tools" onChange={this.props.onChange}
										 existsTools={this.props.strategy.tools}/>
					</div>
				</div>
			);

		}
	}

	renderInfo() {
		if (this.props.strategy.type === '动手妙招') {

			return (
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='info'>妙招信息</label>
					<div className="col-lg-10">
						<div>
							<label className="control-label">难度系数</label>
							<select className='select2_demo_1'
									value={this.props.strategy.degree}
									onChange={this.onChange.bind(this,'degree')}>
								<option value='1'>一级</option>
								<option value='2'>二级</option>
								<option value='3'>三级</option>
								<option value='4'>四级</option>
								<option value='5'>五级</option>
							</select>
						</div>
						<div>
							<label className="control-label">所需时间</label>
							<select className='select2_demo_1'
									value={this.props.strategy.consumingTime}
									onChange={this.onChange.bind(this,'consumingTime')}>
								<option value='小于30分钟'>小于30分钟</option>
								<option value='小于60分钟'>小于60分钟</option>
								<option value='小于90分钟'>小于90分钟</option>
							</select>
						</div>
					</div>
				</div>
			);
		}
	}

	//暂缓
	renderAudio() {
		if (this.props.strategy.type !== '动手妙招') {

			return (
				<div className="form-group">
					<label className="col-lg-2 control-label" htmlFor='audio'>选择音频</label>
					<div className="col-lg-10">
						.....暂缓
					</div>
				</div>
			);
		}
	}

	renderSteps() {
		return (
			<div className="form-group">
				<label className="col-lg-2 control-label" htmlFor='tools'>正文详情</label>
				<div className="col-lg-10">
					<Steps id="steps" onChange={this.props.onChange}
						   existsSteps={this.props.strategy.steps}
					/>
				</div>
			</div>
		);
	}

}
export default validation(validateStrategy)(Strategy);
