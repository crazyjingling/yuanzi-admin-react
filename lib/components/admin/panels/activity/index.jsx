import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';
import pluck from 'lodash.pluck';

import A from '../../../a';
import Animate from '../../../animate';
import Breadcrumbs from '../../../breadcrumbs';
import NotFound from '../not-found';
import Spinner from '../../../spinner';
import TitleSlug from '../../../title-slug';
import Utils from '../../../../helpers/utils';
import OwnerPick from '../../../../containers/data-types/owner-picker';
import LabelPickerByType from '../../../../containers/data-types/labelPickerByType';
import Combobox from '../../../../components/data-types/combobox';
import Lightbox from '../../../lightbox';


export default class Strategy extends Component {
	static fragments = {
		strategy: {
			_id: 1,
			title: 1,
			isRecommended: {
				stateType: 1,
				recommendAt: 1
			},
			steps: 1,
			soundStoryLength: 1,
			soundStory: 1,
			description: 1,
			subTitle: 1,
			content: 1,
			labels: {
				_id: 1,
				title: 1
			},
			owner: {
				_id: 1,
				nickname: 1
			},
			cover: 1,
			strategyNo: 1
		}
	};
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
		strategy: React.PropTypes.object,
		user: React.PropTypes.object,
		breadcrumbs: React.PropTypes.array,
		isNew: React.PropTypes.bool,
		errors: React.PropTypes.any,
		isSlugValid: React.PropTypes.bool,
		validateSlug: React.PropTypes.func,
		onChange: React.PropTypes.func,
		saving: React.PropTypes.bool,
		onUpdate: React.PropTypes.func,
		onCreate: React.PropTypes.func,
		onRevisions: React.PropTypes.func,
		error: React.PropTypes.bool,
		success: React.PropTypes.bool
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
	render() {
		const {isNew} = this.props;
		let result;
		if (!isNew && this.props.errors) {
			result = <NotFound />;
		} else {
			const createdUser = isNew ? this.props.user : this.props.strategy.owner;
			const breadcrumbs = this.props.breadcrumbs.slice();
			breadcrumbs.push({
				label: this.props.strategy.title
			});

			result = (
				<div className='content'>
					{this.renderBasic()}
					{!this.props.isNew && this.renderNext()}
					{this.renderLabelPickerByType()}
				</div>
			);
		}

		return result;
	}

	renderBasic() {
		return (<div>
			<div className="row">
				<div className="col-lg-3"></div>
				<div className="col-lg-6">

					<div className='admin-scrollable'>
						<div className='white-options list'>
							<form className="form-horizontal" onSubmit={this.props.onCreate.bind(this)}>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='title'>作者</label>
									<div className="col-lg-10">
										<OwnerPick user={this.props.user}
												   option={{id: 'owner'}}
												   value={this.props.strategy.owner._id}
												   otherValues={{label: this.props.strategy.owner.nickname, value: this.props.strategy.owner._id}}
												   onChange={::this.onChange}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-lg-2 control-label" htmlFor='title'>标题</label>
									<div className="col-lg-10">
										<input ref='title' type='text' className='form-control'
											   onChange={this.onChange.bind(this,'title')}
											   value={this.props.strategy.title}/>
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
									<label className="col-lg-2 control-label" htmlFor='template'>模板</label>
									<div className="col-lg-10">
										<Combobox onChange={::this.onChange}
												  value={this.state.template}
												  option={{
														id: 'template'
												  }}
												  labels={['动手妙招', '经验妙招']}
												  values={[0, 1]}
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

											<button className="btn btn-primary btn-circle" type="button" onClick={::this.onSelectLabels}>
												<i className="fa fa-plus"></i>
											</button>
										</div>
									</div>
								</div>
								<div>
									<input type='text' hidden/>
								</div>
								<div className="text-center">
									<a className='button button-primary' href='#'
									   onClick={this.props.onCreate.bind(this)}>保存</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-3"></div>
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

	renderLabelPickerByType(){
		if(this.state.labelsSelectting){
			return (
				<Lightbox className='small' header={false} headerWithoutBorder={true}
						  onClose={this.cancelSelectLabels.bind(this)}>
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
}
