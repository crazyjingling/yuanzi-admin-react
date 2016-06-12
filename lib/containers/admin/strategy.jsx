import * as strategyActions from '../../client/actions/strategy';

import cloneDeep from 'lodash.clonedeep';
import concat from 'lodash.concat';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import Lightbox from '../../components/lightbox';

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
	static panelSettings = {
		activePanelType: 'strategy',
		breadcrumbs: [
			{
				link: '/admin/strategies'
			}
		]
	}
	static fragments = {
		strategy: {
			_id: 1,
			title: 1,
			subTitle: 1,
			labels: {
				_id: 1,
				title: 1
			},
			type: 1,
			scope: 1,
			owner: {
				_id: 1,
				nickname: 1
			},
			cover: {
				ossUrl: 1,
				_id: 1
			},
			materials: {
				_id: 1,
				title: 1,
				amount: 1
			},
			tools: {
				_id: 1,
				title: 1,
				amount: 1
			},
			steps: {
				imgUrl: {
					_id: 1,
					ossUrl: 1
				},
				description: 1
			},
			degree: 1,
			consumingTime: 1,
			soundStory: 1,
			soundStoryLength: 1
		}
	};


	static propTypes = {
		strategy: PropTypes.object,
		errors: PropTypes.any,
		slug: PropTypes.string,
		changeStrategyToDefault: PropTypes.func,
		changeStrategyValue: PropTypes.func.isRequired,
		addStrategy: PropTypes.func.isRequired,
		updateStrategy: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired
	}
	getInitState(){
		//todo: 所有操作完成之后怎么清除state中的strategy
		//this.props.changeStrategyToDefault();
		if (this.props.id === 'new') {
			this.props.changeStrategyToDefault();
		}
		return {};
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

		const submitStrategy = strategyProps;

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
			console.log(ex);
		}

		if (hasErrors === false) {
			this.setState({
				saving: false,
				success: true,
				error: false,
				new: false
			});
			this.props.history.pushState({}, `/admin/strategies`);
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

		this.onSubmit(this.props.strategy);
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
