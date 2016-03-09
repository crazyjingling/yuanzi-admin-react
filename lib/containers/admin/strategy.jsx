import * as dndActions from '../../client/actions/dnd';
import * as strategyActions from '../../client/actions/strategy';

import cloneDeep from 'lodash.clonedeep';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Strategy from '../../components/admin/panels/strategy';
@connect(
	(state) => ({
		strategy: state.strategy.data,
		errors: state.strategy.errors,
	}),
	(dispatch) => ({
		...bindActionCreators(strategyActions, dispatch),
	})
)
export default class StrategyContainer extends Component {
	static fragments = Strategy.fragments;

	static panelSettings = {
		activePanelType: 'strategy',
		breadcrumbs: [
			{
				link: '/admin/strategies'
			}
		]
	}

	static propTypes = {
		strategy: PropTypes.object,
		errors: PropTypes.any,
		breadcrumbs: PropTypes.array,
		slug: PropTypes.string,
		changeStrategyToDefault: PropTypes.func,
		changeStrategyValue: PropTypes.func.isRequired,
		addStrategy: PropTypes.func,
		updateStrategy: PropTypes.func,
		history: PropTypes.object.isRequired
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.slug !== 'new' && nextProps.slug === 'new') {
			this.props.changeStrategyToDefault();
		}
	}

	componentWillUnmount () {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
	}

	async onSubmit (strategyProps) {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}

		const submitStrategy = cloneDeep(strategyProps);

		let action;
		const isNew = this.isNew();

		if (isNew) {
			action = ::this.props.addStrategy;
		} else {
			action = ::this.props.updateStrategy;
		}

		let hasErrors = false;
		let resultStrategy;
		try {
			resultStrategy = await action(this.constructor.fragments, submitStrategy);
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
			if (isNew) {
				this.props.history.pushState({}, `/admin/strategys/${resultStrategy._id}`);
			}
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

		const dom = findDOMNode(this.refs.strategy.refs.success);
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
			savingLabel: 'Updating strategy'
		});

		this.onSubmit(this.props.strategy);
	}

	onCreate () {
		this.setState({
			saving: true,
			savingLabel: 'Creating strategy'
		});

		this.onSubmit(cloneDeep(this.props.strategy));
	}

	onChange (id, value) {
		this.props.changeStrategyValue(id, value);
	}

	async validateSlug (slug) {
		const strategyId = this.props.strategy._id;
		return await this.props.validateStrategySlug({slug, strategyId});
	}

	isNew () {
		return !this.props.strategy._id;
	}

	render () {
		return (
			<Strategy
				ref='strategy'
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
