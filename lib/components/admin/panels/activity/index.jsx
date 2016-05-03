import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';
import Animate from '../../../animate';
import NotFound from '../not-found';
import Spinner from '../../../spinner';
import LabelPickerByType from '../../../../containers/data-types/labelPickerByType';
import Lightbox from '../../../lightbox';
import DatePicker from '../../../data-types/date-picker';
import OwnerPick from '../../../../containers/data-types/owner-picker';
var ReactQuill = require('react-quill');
import ImagePicker from '../../../../containers/data-types/image-picker'
export default class Activity extends Component {

	//static validatorSchema = {
	//	title: Joi.string().min(3).required().label('标题')
	//};
	//
	//validatorTypes() {
	//	return {
	//		title: Joi.string().required().label('标题')
	//	}
	//}
	//
	//getValidatorData() {
	//	return {
	//		title: findDOMNode(this.refs.title).value
	//	};
	//}
	static propTypes = {
		activity: React.PropTypes.object,
		user: React.PropTypes.object.isRequired,
		breadcrumbs: React.PropTypes.array,
		isNew: React.PropTypes.bool,
		errors: React.PropTypes.any,
		isSlugValid: React.PropTypes.bool,
		validateSlug: React.PropTypes.func,
		onChange: React.PropTypes.func,
		saving: React.PropTypes.bool,
		addActivity: React.PropTypes.func,
		onUpdate: React.PropTypes.func,
		onCreate: React.PropTypes.func,
		onRevisions: React.PropTypes.func,
		error: React.PropTypes.bool,
		success: React.PropTypes.bool,

	}

	getInitState() {
		return {
			template: 0,
			labelsSelectting: false
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
			case 'template':
				this.setState({template: value});
				break;
			default:
				this.props.onChange(id, value);
		}

	}
	onSelectLabels(){
		this.setState({labelsSelectting: true});
	}
	cancelSelectLabels(){
		this.setState({labelsSelectting: false});
	}
	confirmSelectLabels(selectedLabels){
		this.setState({labelsSelectting: false});
		this.props.onChange('labels', selectedLabels);
	}

	onTextChange(value){
		this.props.onChange('content', value);
	}

	onDateChange(id, value) {
		this.props.onChange(id, value);
	}
	onImageChange(mediaItem) {
		this.props.onChange('cover', {
			_id: mediaItem._id,
			ossUrl: mediaItem.ossUrl
		});
	}
	onBannerImageChange(mediaItem) {
		this.props.onChange('bannerImg', {
			_id: mediaItem._id,
			ossUrl: mediaItem.ossUrl
		});
	}
	render() {
		const {isNew} = this.props;
		let result;
		if (!isNew && this.props.errors) {
			result = <NotFound />;
		} else {
			const createdUser = isNew ? this.props.user : this.props.strategy.owner;
			const breadcrumbs = this.props.breadcrumbs.slice();
			breadcrumbs.push({
				label: ''
			});

			result = (
				<div className='content'>
					{this.renderBasic()}
					{!this.props.isNew && this.renderNext()}
				</div>
			);
		}

		return result;
	}

	renderBasic() {
		return (<div>
			<div className="row">
				<div className="col-lg-12">

					<div className='admin-scrollable ibox float-e-margins'>
						<div className='white-options list ibox-content'>
							<form className="form-horizontal" onSubmit={this.props.onCreate.bind(this)}>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='owner'>作者</label>
									<div className="col-lg-10">
										<OwnerPick user={this.props.user}
										           className='select2_demo_1 form-control'
										           option={{id: 'owner', isNullShow: true}}
										           value={this.props.activity.owner._id}
										           otherValues={{label: this.props.activity.owner.nickname, value: this.props.activity.owner._id}}
										           onChange={::this.onChange}
										/>
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">

									<label className="col-lg-2 control-label" htmlFor='title'>活动标题</label>
									<div className="col-lg-10">
										<input ref='title' type='text' className='form-control'
											   onChange={this.onChange.bind(this,'title')}
											   value={this.props.activity.title}/>
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='price'>活动费用</label>
									<div className="col-lg-10">
										<div className="input-group m-b">
											<span className="input-group-addon">$</span>
											<input ref='title' type='text' className='form-control'
											       onChange={this.onChange.bind(this,'price')}
											       value={this.props.activity.price}/>
										</div>
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='number'>人数限制</label>
									<div className="col-lg-10">
										<input ref='title' type='text' className='form-control'
										       onChange={this.onChange.bind(this,'number')}
										       value={this.props.activity.number}/>
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='startDate'>开始时间</label>
									<div className="col-lg-10">
										<DatePicker id='startDate'
										            dateFormat="YYYY-MM-DD"
										            selected={this.props.activity.startDate}
										            maxDate={moment()}
										            onChange={::this.onDateChange}
										/>
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='endDate'>结束时间</label>
									<div className="col-lg-10">
										<DatePicker id='endDate'
										            dateFormat="YYYY-MM-DD"
										            minDate={moment()}
										            selected={this.props.activity.endDate}
										            onChange={::this.onDateChange}
										/>
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">

									<label className="col-lg-2 control-label" htmlFor='title'>活动位置</label>
									<div className="col-lg-10">
										<input ref='title' type='text' className='form-control'
										       onChange={this.onChange.bind(this,'location')}
										       value={this.props.activity.location}/>
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='cover'>封面</label>
									<div className="col-lg-10">
										<ImagePicker ref="cover" value={this.props.activity.cover._id}
										             width={140} height={140}
										             widthAndHeightStyle={{width: '140px', height: '140px'}}
										             onChange={::this.onImageChange}
										/>
										{this.renderHelpText(this.state.imageEmptyMessage)}
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='cover'>banner 封面</label>
									<div className="col-lg-10">
										<ImagePicker ref="bannerImg" value={this.props.activity.bannerImg._id}
										             width={140} height={140}
										             widthAndHeightStyle={{width: '140px', height: '140px'}}
										             onChange={::this.onBannerImageChange}
										/>
										{this.renderHelpText(this.state.imageEmptyMessage)}
									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='title'>活动详情</label>
									<div className="col-lg-10" >
										<ReactQuill ref='content' style={{ border: '1px solid #e5e6e7'}}
											theme="snow"
										            value={this.props.activity.content}
													onChange={::this.onTextChange} />

									</div>
								</div>
								<div className="hr-line-dashed"></div>
								<div>
									<input type='text' hidden/>
								</div>
								<div className="hr-line-dashed"></div>
								<div className="form-group">
									<div className="col-sm-4 col-sm-offset-2">
										<a className='btn btn-primary' href='#'
										   onClick={this.props.onCreate.bind(this)}>保存</a>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>)
	}

	renderNext() {
		let result;
		if (this.props.saving) {
			result = (
				<Animate transition='slideDownIn' key='saving'>
					<div className='saving'>
						<Spinner />
						<span>{this.props.savingLabel}</span>
					</div>
				</Animate>
			);
		} else if (this.props.errors) {
			result = (
				<Animate transition='slideDownIn' key='error'>
					<div className='error' ref='success'>
						<i className='material-icons'>error_outline</i>
						<span>Something went bad!</span>
					</div>
				</Animate>
			);
		} else if (this.props.success) {
			result = (
				<Animate transition='slideDownIn' key='success'>
					<div className='success' ref='success'>
						<i className='material-icons'>check</i>
						<span>All good!</span>
					</div>
				</Animate>
			);
		}
		return result;
	}

	renderSaving() {
		let result;
		if (this.props.saving) {
			result = (
				<Animate transition='slideDownIn' key='saving'>
					<div className='saving'>
						<Spinner />
						<span>{this.props.savingLabel}</span>
					</div>
				</Animate>
			);
		} else if (this.props.errors) {
			result = (
				<Animate transition='slideDownIn' key='error'>
					<div className='error' ref='success'>
						<i className='material-icons'>error_outline</i>
						<span>Something went bad!</span>
					</div>
				</Animate>
			);
		} else if (this.props.success) {
			result = (
				<Animate transition='slideDownIn' key='success'>
					<div className='success' ref='success'>
						<i className='material-icons'>check</i>
						<span>All good!</span>
					</div>
				</Animate>
			);
		}
		return result;
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
}
