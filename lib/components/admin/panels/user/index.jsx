import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';
import {findDOMNode} from 'react-dom';
import pluck from 'lodash.pluck';

import A from '../../../a';
import Animate from '../../../animate';
import Breadcrumbs from '../../../breadcrumbs';
import NotFound from '../not-found';
import Spinner from '../../../spinner';
import TitleSlug from '../../../title-slug';
import Utils from '../../../../helpers/utils';
import LabelPickerByType from '../../../../containers/data-types/labelPickerByType';
import Combobox from '../../../../components/data-types/combobox';
import Lightbox from '../../../lightbox';
import Joi from 'joi';
import validation from 'react-validation-mixin'; //import the mixin
import strategy from 'joi-validation-strategy'; //choose a validation strategy
import DatePicker from 'react-datepicker';
import ImagePicker from '../../../../containers/data-types/image-picker'

class User extends Component {
	validatorTypes() {
		return {
			nickname: Joi.string().required().label('昵称'),
			'account.username': Joi.string().regex(/^1[3,4,5,7,8]\d{9}$/).required().label('手机号').options(
				{
					language: {
						any: {
							empty: '{{key}}不能为空'
						},
						string: {
							regex: {
								base: '{{key}}不正确'
							}
						}

					}
				}
			)
		}
	}

	getValidatorData() {
		return {
			nickname: findDOMNode(this.refs.nickname).value,
			'account.username': findDOMNode(this.refs['account.username']).value
		};
	}

	static propTypes = {
		session: React.PropTypes.object.isRequired,
		breadcrumbs: React.PropTypes.array,
		userEntry: React.PropTypes.object.isRequired,
		errors: React.PropTypes.any,
		changeUserEntryValue: React.PropTypes.func.isRequired,
		saving: React.PropTypes.bool,
		onCreate: React.PropTypes.func,
		onRevisions: React.PropTypes.func,
		error: React.PropTypes.bool,
		success: React.PropTypes.bool
	}

	getInitState() {
		return {
			labelsSelectting: false,
			errorShowing: false,
			newUser: this.props.userEntry
		};
	}

	onChange(id, event) {
		this.props.changeUserEntryValue(id, event.target.value);
	}

	onSelectLabels() {
		this.setState({labelsSelectting: true});
	}

	confirmSelectLabels(selectedLabels) {
		this.setState({labelsSelectting: false});
		let newUser = this.props.userEntry;
		newUser.labels = selectedLabels;
		this.setState({newUser: newUser});
	}

	closeLightbox() {
		this.setState({
			errorShowing: false,
			labelsSelectting: false
		});
	}

	onSave() {
		event.preventDefault();
		const onValidate = (error) => {
			if (!error) {
				this.props.onCreate(this.props.userEntry);
			}
		};
		this.props.validate(onValidate);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errorShowing: true});
		}
	}
	componentDidMount(){

	}
	render() {

		return (
			<div className='content'>
				{this.renderBasic()}
				{this.renderLabelPickerByType()}
				{this.renderError()}
			</div>
		);
	}

	renderBasic() {
		return (
			<div>
				<div className="row">
					<div className="col-lg-12">
						<h1>添加用户</h1>
						<hr/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3"></div>
					<div className="col-lg-6">

						<div className='admin-scrollable'>
							<div className='white-options list'>
								<form className="form-horizontal" onSubmit={this.props.onCreate.bind(this)}>
									<div className="form-group">
										<label className="col-lg-2 control-label" htmlFor='avatar'>头像</label>
										<div className="col-lg-10">
											<ImagePicker ref="avatar" value={this.props.userEntry.avatar}
														 widthAndHeightStyle={{width: '140px', height: '140px'}}
														 borderRadiusStyle={{borderRadius: '50%'}}
														 id="avatar"
														 onChange={::this.onChange}
											/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-2 control-label" htmlFor='account.username'>手机号</label>
										<div className="col-lg-10">
											<input ref='account.username' type='text' className='form-control'
												   onChange={this.onChange.bind(this,'account.username')}
												   value={this.props.userEntry.account.username}/>
											{this.renderHelpText(this.props.getValidationMessages('account.username'))}

										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-2 control-label" htmlFor='nickname'>昵称</label>
										<div className="col-lg-10">
											<input ref='nickname' type='text' className='form-control'
												   onChange={this.onChange.bind(this,'nickname')}
												   value={this.props.userEntry.nickname}/>
											{this.renderHelpText(this.props.getValidationMessages('nickname'))}

										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-2 control-label" htmlFor='gender'>性别</label>
										<div className="col-lg-10">
											<select ref='gender' className='select2_demo_1 form-control'
													value={this.props.userEntry.gender}
													onChange={this.onChange.bind(this,'gender')}>
												<option value='m'>男</option>
												<option value='f'>女</option>
											</select>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-2 control-label" htmlFor='baby.gender'>宝宝性别</label>
										<div className="col-lg-10">
											<select ref='baby.gender' className='select2_demo_1 form-control'
													value={this.props.userEntry.baby.gender}
													onChange={this.onChange.bind(this,'baby.gender')}>
												<option value='m'>男</option>
												<option value='f'>女</option>
											</select>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-2 control-label" htmlFor='baby.birth'>宝宝生日</label>
										<div className="col-lg-10">
											<DatePicker ref='baby.birth'
														dateFormat="YYYY-MM-DD"
														selected={this.props.userEntry.baby.birth}
														maxDate={moment()}
														onChange={this.onChange.bind(this, 'baby.birth')}
											/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-2 control-label" htmlFor='labels'>标签</label>
										<div className="col-lg-10">
											<div className="col-lg-11">
												<input ref='labels' type='text' className='form-control'
													   value={pluck(this.props.userEntry.labels, 'title')}/>
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
										<label className="col-lg-2 control-label" htmlFor='description'>简介</label>
										<div className="col-lg-10">
											<input ref='description' type='textarea' className='form-control'
												   value={this.props.userEntry.description}
												   onChange={this.onChange.bind(this,'description')}
											/>
										</div>
									</div>
									<div>
										<input type='text' hidden/>
									</div>
									<div className="text-center">
										<a className='button button-primary' href='#'
										   onClick={this.onSave.bind(this)}>保存</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-3"></div>
			</div>)
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

	renderLabelPickerByType() {
		if (this.state.labelsSelectting) {
			return (
				<Lightbox className='small' header={false} headerWithoutBorder={true}
						  onClose={this.closeLightbox.bind(this)}>
					<div className='centered'>
						<LabelPickerByType
							selectedLabelsMaxLength={3}
							labelsType='userAssortment'
							selectedLabels={this.props.userEntry.labels}
							onConfirm={::this.confirmSelectLabels}
						/>

					</div>
				</Lightbox>
			);
		}

	}

	renderError() {
		if (this.state.errorShowing) {
			return (
				<Lightbox className='xs' header={false} headerWithoutBorder={true}
						  onClose={this.closeLightbox.bind(this)}>
					<div className='centered'>
						{this.props.errors[0].message}
					</div>
				</Lightbox>
			);
		}
	}
}
export default validation(strategy)(User);