import * as topicActions from '../../client/actions/topic';

import cloneDeep from 'lodash.clonedeep';
import concat from 'lodash.concat';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import Lightbox from '../../components/lightbox';

import Topic from '../../components/admin/panels/topic';
@connect(
	(state) => ({
		topic: state.topic.data,
		errors: state.topic.errors,
	}),
	(dispatch) => ({
		...bindActionCreators(topicActions, dispatch),
	})
)
export default class TopicContainer extends Component {
	static panelSettings = {
		activePanelType: 'topic',
		breadcrumbs: [
			{
				link: '/admin/topics'
			}
		]
	}
	static fragments = {
		topic: {
			_id: 1,
			title: 1,
			subTitle: 1,
			labels: {
				_id: 1,
				title: 1
			},
			owner: {
				_id: 1,
				nickname: 1
			},
			cover: {
				ossUrl: 1,
				_id: 1
			},
			strategies: {
				_id: 1,
				title: 1,
				cover: 1
			}
		}
	};


	static propTypes = {
		topic: PropTypes.object,
		errors: PropTypes.any,
		slug: PropTypes.string,
		changeTopicToDefault: PropTypes.func,
		changeTopicValue: PropTypes.func.isRequired,
		addTopic: PropTypes.func.isRequired,
		updateTopic: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired
	}
	getInitState(){
		if (this.props.id === 'new') {
			this.props.changeTopicToDefault();
		}
		return {};
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.slug !== 'new' && nextProps.slug === 'new') {
			this.props.changeTopicToDefault();
		}
	}

	componentWillUnmount () {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
	}

	async onSubmit (topicProps) {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}

		const submitTopic = topicProps;

		let action;
		const isNew = this.isNew();

		if (isNew) {
			action = ::this.props.addTopic;
		} else {
			action = ::this.props.updateTopic;
		}

		let hasErrors = false;
		let resultTopic;
		try {
			resultTopic = await action(this.constructor.fragments, submitTopic);
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
			if (isNew) {
				this.props.history.pushState({}, `/admin/topics`);
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

		const dom = findDOMNode(this.refs.topic.refs.success);
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
			savingLabel: 'Updating topic'
		});

		this.onSubmit(this.props.topic);
	}

	onCreate () {
		this.setState({
			saving: true,
			savingLabel: 'Creating topic'
		});

		this.onSubmit(this.props.topic);
	}

	onChange (id, value) {
		this.props.changeTopicValue(id, value);
	}

	async validateSlug (slug) {
		const topicId = this.props.topic._id;
		return await this.props.validateTopicSlug({slug, topicId});
	}

	isNew () {
		return !this.props.topic._id;
	}

	render () {
		return (
			<Topic
				ref='topic'
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
