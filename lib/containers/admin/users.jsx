import * as usersActions from '../../client/actions/users';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';
import Utils from '../../helpers/utils';

import queryProps from '../../decorators/query-props';
import Users from '../../components/admin/panels/users';
import {userConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import LabelPickerByType from '../data-types/labelPickerByType';

import countBy from 'lodash.countby';
@connect(
	(state) => ({
		users: state.users.data.items,
		count: state.users.data.count
	}),
	(dispatch) => bindActionCreators(usersActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'desc',
	search: JSON.stringify(userConfig.searchValues || {})
})
export default class UsersContainer extends Component {
	static fragments = Users.fragments
	static defaultRequiredSearch = userConfig.defaultRequiredSearch;

	static panelSettings = userConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		users: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		removeUser: PropTypes.func.isRequired,
		updateUser: PropTypes.func.isRequired,
	}

	getInitState() {
		return {
			searchValues: userConfig.searchValues || {},
			checking: false,
			labelsSelectting: false
		};
	}
	onCheck(data){
		this.setState({
			checking: true,
			checkUser: data
		});
	}
	cancelCheck(){
		this.setState({
			checking: false
		});
	}
	refuseCheck(){
		this.setState({
			checking: false
		});
		let checkUser = this.state.checkUser;
		checkUser.talentStatus = 'undone';
		checkUser.talentInfo = {};
		this.props.updateUser(userConfig.fragments, this.state.checkUser)
			.done();

	}
	passedCheck(){
		this.setState({
			checking: false
		});
		let checkUser = this.state.checkUser;
		checkUser.talentStatus = 'done';
		this.props.updateUser(userConfig.fragments, this.state.checkUser)
			.done();

	}
	onEditLabels(data){
		this.setState({
			labelsSelectting: true,
			edittingUser: data
		});
	}

	cancelEditLabels(){
		this.setState({labelsSelectting: false});
	}
	confirmEditLabels(selectedLabels){
		this.setState({labelsSelectting: false});
		this.props.updateUser({user: {_id: 1,labels:{_id: 1,title: 1}}}, {_id:this.state.edittingUser._id,labels: selectedLabels})
			.done();
	}

	onDel(data){
		this.props.updateUser({user: {_id: 1,isDel: 1}}, {
			_id: data._id,
			isDel: data.isDel === '封号' ? false: true,
			labels: data.labels //这里加labels是因为graphql的updateUser中的labels的type是GraphQLList,默认是空数组,会覆盖labels数据
		}).done();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				users: {
					...nextProps.queryVariables
				}
			};

			nextProps
				.getAdmin(buildQueryAndVariables(
					this.constructor.fragments,
					vars
				))
				.done();
		}
	}

	render() {
		return (
			<div>
				<Users
					{...this.props}
					{...this.state}
					onCheck={::this.onCheck}
					onEditLabels={::this.onEditLabels}
					onDel={::this.onDel}
				/>
				{this.renderCheck()}
				{this.renderLabelPickerByType()}
			</div>
		);
	}
	renderCheck(){
		if(this.state.checking){
			return (
				<Lightbox className='xs' header={true} title="申请资料" onClose={this.cancelCheck.bind(this)}>
					<div className='centered'>
						<div className="text-left">姓名: {this.state.checkUser.talentInfo.name}</div>
						<div className="text-left">手机: {this.state.checkUser.talentInfo.mobile}</div>
						<div className="text-left">微信: {this.state.checkUser.talentInfo.wechat}</div>
						<div className="text-left">擅长领域: {this.state.checkUser.talentInfo.goodAt}</div>
						<div className="text-left">其他: {this.state.checkUser.talentInfo.goodAtOther}</div>
						<a className='button button-alert vmargined' href='#'
						   onClick={this.passedCheck.bind(this)}>通过</a>
						<a className='button button-alert margined' href='#'
						   onClick={this.refuseCheck.bind(this)}>拒绝</a>
					</div>
				</Lightbox>
			);
		}
	}

	renderLabelPickerByType() {
		if (this.state.labelsSelectting) {
			return (
				<Lightbox className='small' header={false} headerWithoutBorder={true}
						  onClose={this.cancelEditLabels.bind(this)}>
					<div className='centered'>
						<LabelPickerByType
							selectedLabelsMaxLength={3}
							labelsType='userAssortment'
							selectedLabels={this.state.edittingUser.labels}
							onConfirm={::this.confirmEditLabels}
						/>

					</div>
				</Lightbox>
			);
		}

	}
}
