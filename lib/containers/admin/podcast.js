/**
 * Created by matonghe on 16/5/30.
 */
import * as dndActions from '../../client/actions/dnd';
import * as podcastActions from '../../client/actions/podcast';

import cloneDeep from 'lodash.clonedeep';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import Podcast from '../../components/admin/panels/podcast';
import podcastConfig from './containerInitConfig/podcast';
@connect(
	(state) => ({
		podcast: state.podcast.data,
		errors: state.podcast.errors
	}),
	(dispatch) => ({
		...bindActionCreators(podcastActions, dispatch),
	})
)
export default class PodcastContainer extends Component {
	static fragments = podcastConfig.fragments;

	static panelSettings = {
		activePanelType: 'podcast',
		breadcrumbs: [
			{
				link: '/admin/podcasts'
			}
		]
	};

	static propTypes = {
		podcast: PropTypes.object,
		errors: PropTypes.any,
		breadcrumbs: PropTypes.array,
		slug: PropTypes.string,
		changePodcastToDefault: PropTypes.func,
		changePodcastValue: PropTypes.func.isRequired,
		addPodcast: PropTypes.func,
		updatePodcast: PropTypes.func,
		history: PropTypes.object.isRequired
	};

	componentWillReceiveProps (nextProps) {
		if (this.props.slug !== 'new' && nextProps.slug === 'new') {
			this.props.changePodcastToDefault();
		}
	}

	componentWillUnmount () {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
	}

	async onSubmit (podcastProps) {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
		podcastProps.isBanner = podcastProps.isBanner === 'false'? false: true;
		const submitPodcast = cloneDeep(podcastProps);
		let action;
		const isNew = this.isNew();
		if (isNew) {
			action = ::this.props.addPodcast;
		} else {
			action = ::this.props.updatePodcast;
		}
		let hasErrors = false;
		let resultPodcast;
		try {
			resultPodcast = await action(this.props.fragments, submitPodcast);
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
			if (!isNew) {
				this.props.history.pushState({}, `/admin/podcasts/${resultPodcast.updatePodcast._id}`);
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

		const dom = findDOMNode(this.refs.podcast.refs.success);
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
			savingLabel: 'Updating podcast'
		});

		this.onSubmit(this.props.podcast);
	}

	onCreate () {
		this.setState({
			saving: true,
			savingLabel: 'Creating podcast'
		});

		this.onSubmit(this.props.podcast);
	}

	onChange (id, value) {
		this.props.changePodcastValue(id, value);
	}

	async validateSlug (slug) {
		const podcastId = this.props.podcast._id;
		return await this.props.validatePodcastSlug({slug, podcastId});
	}

	isNew () {
		return !this.props.podcast._id;
	}

	render () {
		return (
			<Podcast
				ref='podcast'
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
