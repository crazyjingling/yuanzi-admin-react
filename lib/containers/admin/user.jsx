import * as userActions from '../../client/actions/user';

import cloneDeep from 'lodash.clonedeep';
import concat from 'lodash.concat';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import Lightbox from '../../components/lightbox';

import User from '../../components/admin/panels/user';
@connect(
	(state) => ({
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

	// 注意redux中的默认state结构最好跟这里的fragments一致
	static fragments = {
		user: {
			_id: 1,
			avatar: {
				_id: 1,
				ossUrl: 1
			},
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
			description: 1
		}
	};
	static propTypes = {
		userEntry: PropTypes.object.isRequired,
		addUser: PropTypes.func.isRequired,
		changeUserEntryValue: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired,
		errors: PropTypes.any
	}
	getInitState(){
		return {
			errorShowing: false,
			errors: []
		};
	}

	closeLightbox() {
		this.setState({
			errorShowing: false
		});
	}
	async onSubmit (submitUser) {

		let action;
			action = ::this.props.addUser;

		try {
			await action(this.constructor.fragments, submitUser);
		} catch (ex) {
			this.setState({errors: [ex]});
		}
		if ((this.state.errors&&this.state.errors.length) || (this.props.errors&&this.props.errors.length)) {
			this.setState({errorShowing: true});

		} else {
			this.props.history.pushState({}, '/admin/users');
		}
	}

	render () {
		return (
			<div>
                <User
                    ref='user'
                    {...this.props}
                    {...this.state}
					userEntry={this.props.userEntry}
                    onCreate={::this.onSubmit}
                    changeUserEntryValue={::this.props.changeUserEntryValue}
                />
				{this.renderError()}
			</div>
		);
	}

	renderError() {
		if (this.state.errorShowing) {
			let errors = concat(this.state.errors||[],this.props.errors||[]);
			return (
				<Lightbox className='xs' header={false} headerWithoutBorder={true}
						  onClose={this.closeLightbox.bind(this)}>
					<div className='centered'>
						{errors[0].message}
					</div>
				</Lightbox>
			);
		}
	}
}
