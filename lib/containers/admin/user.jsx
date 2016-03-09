import * as userActions from '../../client/actions/user';

import cloneDeep from 'lodash.clonedeep';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import User from '../../components/admin/panels/user';
@connect(
	(state) => ({
		session: state.session.data,
		userEntry: state.userEntry.data,
		errors: state.userEntry.errors
	}),
	(dispatch) => ({
		...bindActionCreators(userActions, dispatch),
	})
)
export default class UserContainer extends Component {
	static panelSettings = {
		activePanelType: 'user',
		breadcrumbs: [
			{
				link: '/admin/users'
			}
		]
	}

	static propTypes = {
		session: PropTypes.object.isRequired,
		breadcrumbs: PropTypes.array,
		addUser: PropTypes.func.isRequired,
		changeUserEntryValue: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired
	}
	static fragments = {
		user: {
			_id: 1,
			avatar: 1,
			account: {
				username: 1,
				platform: 1,
				password: 1
			},
			nickname: 1,
			gender: 1,
			baby: {
				birth: 1,
				gender: 1
			},
			labels: {
				_id: 1,
				title: 1
			},
			description: 1,
			password: 1
		}
	};

	componentWillUnmount () {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
	}

	async onSubmit (newUser) {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}

		const submitUser = cloneDeep(newUser);

		let action;

			action = ::this.props.addUser;

		let hasErrors = false;
		let resultUser;
		try {
			resultUser = await action(this.constructor.fragments, submitUser);
		} catch (ex) {
			hasErrors = true;
			console.error(ex);
		}

		if (hasErrors === false) {
			this.setState({
				saving: false,
				success: true,
				error: false,
				new: false
			});

			this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
		} else {
			this.setState({
				saving: false,
				error: true
			});
		}
	}

	onSuccessOut () {
		clearTimeout(this.successTimeout);

		const dom = findDOMNode(this.refs.user.refs.success);
		if (dom) {
			const transition = 'transition.slideDownOut';
			Velocity(dom, transition, {
				duration: 400,
				display: null
			}).then(() => {
				this.setState({
					success: false
				});
			});
		}
	}

	onCreate (newUser) {
		this.setState({
			saving: true,
			savingLabel: 'Creating user'
		});

		this.onSubmit(newUser);
	}

	render () {
		return (
			<User
				ref='user'
				{...this.props}
				{...this.state}
				errors={this.props.errors}
				onCreate={::this.onCreate}
				changeUserEntryValue={::this.props.changeUserEntryValue}
			/>
		);
	}
}
