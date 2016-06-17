import * as dndActions from '../../client/actions/dnd';
import * as activityActions from '../../client/actions/activities';

import cloneDeep from 'lodash.clonedeep';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import Activity from '../../components/admin/panels/activity';
import activityConfig from './containerInitConfig/activity';
@connect(
	(state) => ({
		activity: state.activity.data,
		errors: state.activity.errors
	}),
	(dispatch) => ({
		...bindActionCreators(activityActions, dispatch),
	})
)
export default class ActivityContainer extends Component {

	static panelSettings = {
		activePanelType: 'activity',
		breadcrumbs: [
			{
				link: '/admin/activities'
			}
		]
	};

	static propTypes = {
		activity: PropTypes.object,
		errors: PropTypes.any,
		breadcrumbs: PropTypes.array,
		slug: PropTypes.string,
		changeActivityToDefault: PropTypes.func,
		changeActivityValue: PropTypes.func.isRequired,
		addActivity: PropTypes.func,
		updateActivity: PropTypes.func,
		history: PropTypes.object.isRequired
	};

	componentWillReceiveProps (nextProps) {
		if (this.props.slug !== 'new' && nextProps.slug === 'new') {
			this.props.changeActivityToDefault();
		}
	}

	componentWillUnmount () {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
	}

	async onSubmit (activityProps) {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
		activityProps.isBanner = activityProps.isBanner === 'false'? false: true;
		const submitActivity = cloneDeep(activityProps);
		let action;
		const isNew = this.isNew();
		if (isNew) {
			action = ::this.props.addActivity;
		} else {
			action = ::this.props.updateActivity;
		}
		let hasErrors = false;
		let resultActivity;
		try {
			resultActivity = await action(activityConfig.fragments, submitActivity);
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
			this.props.history.pushState({}, `/admin/activities`);
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

		const dom = findDOMNode(this.refs.activity.refs.success);
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

	onUpdate () {
		this.setState({
			saving: true,
			savingLabel: 'Updating activity'
		});

		this.onSubmit(this.props.activity);
	}

	onCreate () {
		this.setState({
			saving: true,
			savingLabel: 'Creating activity'
		});

		this.onSubmit(this.props.activity);
	}

	onChange (id, value) {
		this.props.changeActivityValue(id, value);
	}

	async validateSlug (slug) {
		const activityId = this.props.activity._id;
		return await this.props.validateActivitySlug({slug, activityId});
	}

	isNew () {
		return !this.props.activity._id;
	}

	render () {
		return (
			<Activity
				ref='activity'
				{...this.props}
				{...this.state}
				errors={this.props.errors}
				isNew={this.isNew()}
				onChange={::this.onChange}
				onCreate={::this.onCreate}
				onUpdate={::this.onUpdate}
				validateSlug={::this.validateSlug}
			/>
		);
	}
}
