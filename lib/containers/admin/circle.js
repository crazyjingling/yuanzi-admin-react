/**
 * Created by matonghe on 16/6/16.
 */
import * as dndActions from '../../client/actions/dnd';
import * as circleActions from '../../client/actions/circles';

import cloneDeep from 'lodash.clonedeep';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import Circle from '../../components/admin/panels/circle';
import circleConfig from './containerInitConfig/circle';
@connect(
	(state) => ({
		circle: state.circle.data,
		errors: state.circle.errors
	}),
	(dispatch) => ({
		...bindActionCreators(circleActions, dispatch),
	})
)
export default class CircleContainer extends Component {

	static panelSettings = {
		activePanelType: 'circle',
		breadcrumbs: [
			{
				link: '/admin/circles'
			}
		]
	};

	static propTypes = {
		circle: PropTypes.object,
		errors: PropTypes.any,
		breadcrumbs: PropTypes.array,
		slug: PropTypes.string,
		changeCircleToDefault: PropTypes.func,
		changeCircleValue: PropTypes.func.isRequired,
		addCircle: PropTypes.func,
		updateCircle: PropTypes.func,
		history: PropTypes.object.isRequired
	};

	componentWillReceiveProps (nextProps) {
		if (this.props.slug !== 'new' && nextProps.slug === 'new') {
			this.props.changeCircleToDefault();
		}
	}

	componentWillUnmount () {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
	}

	async onSubmit (circleProps) {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
		const submitCircle = cloneDeep(circleProps);
		let action;
		const isNew = this.isNew();
		if (isNew) {
			action = ::this.props.addCircle;
		} else {
			action = ::this.props.updateCircle;
		}
		let hasErrors = false;
		let resultCircle;
		try {
			resultCircle = await action(circleConfig.fragments, submitCircle);
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
			this.props.history.pushState({}, `/admin/circles`);
			this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
		} else {
			this.setState({
				saving: false,
				error: true
			});
			this.props.history.pushState({}, `/admin/circles`);
		}
	}

	onSuccessOut () {
		clearTimeout(this.successTimeout);

		const dom = findDOMNode(this.refs.circle.refs.success);
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
			savingLabel: 'Updating circle'
		});

		this.onSubmit(this.props.circle);
	}

	onCreate () {
		this.setState({
			saving: true,
			savingLabel: 'Creating circle'
		});

		this.onSubmit(this.props.circle);
	}

	onChange (id, value) {
		this.props.changeCircleValue(id, value);
	}

	async validateSlug (slug) {
		const circleId = this.props.circle._id;
		return await this.props.validateCircleSlug({slug, circleId});
	}

	isNew () {
		return !this.props.circle._id;
	}

	render () {
		return (
			<Circle
				ref='circle'
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
