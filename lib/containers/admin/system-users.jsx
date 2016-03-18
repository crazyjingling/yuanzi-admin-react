import * as usersActions from '../../client/actions/users';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';
import Lightbox from '../../components/lightbox';

import queryProps from '../../decorators/query-props';
import SystemUsers from '../../components/admin/panels/system-users';
import {systemUserConfig} from './containerInitConfig';
import filter from 'lodash.filter';

@connect(
	(state) => ({
		users: state.users.data.items,
		count: state.users.data.count
	}),
	(dispatch) => bindActionCreators(usersActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 10,
	sort: 'createdAt',
	order: 'desc',
	search: JSON.stringify(systemUserConfig.defaultRequiredSearch)
})
export default class SystemUsersContainer extends Component {
	static fragments = SystemUsers.fragments;

	static panelSettings = systemUserConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		users: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		updateUser: PropTypes.func.isRequired,
		removeUser: PropTypes.func.isRequired,
	}
	getInitState() {
		return {
			searchValues: systemUserConfig.searchValues || {},
			removing: false,
			editting: false
		};
	}
	// 删除
	onRemove(data, event) {
		event.preventDefault();
		this.setState({
			removing: true,
			removeData: data
		});
	}
	cancelRemove(event) {
		event.preventDefault();
		this.setState({
			removing: false
		});
	}
	confirmRemove(event) {
		event.preventDefault();
		this.props.removeUser({
				user: {_id: 1}
			}, this.state.removeData._id)
			.done();
		this.setState({
			removing: false
		});

	}

	//编辑
	onEdit (user) {
		this.setState({
			edit: true,
			editingUser: user
		});
	}
	onEditClose () {
		this.setState({
			editting: false
		});
	}
	onPasswordReset(data){
		data.password = '123456';
		this.props.updateUser(systemUserConfig.fragments, data);
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
				<SystemUsers
					{...this.props}
					{...this.state}
					onRemove={::this.onRemove}
					onPasswordReset={::this.onPasswordReset}
					onEdit={::this.onEdit}
					onEditClose={::this.onEditClose}
				/>
				{this.renderRemoving()}
			</div>
		);
	}

	renderRemoving() {
		if (this.state.removing) {
			const label = `您是否确定删除当前数据?`;
			const label1 = '删除后将无法恢复';
			return (
				<Lightbox className='small' header={false}>
					<div className='big centered'>{label}</div>
					<div className='medium centered'>{label1}</div>
					<div className='centered space-above'>
						<a className='button button-grey margined' href='#'
						   onClick={this.cancelRemove.bind(this)}>取消</a>
						<a className='button button-alert margined' href='#'
						   onClick={this.confirmRemove.bind(this)}>确定</a>
					</div>
				</Lightbox>
			);
		}
	}

}
