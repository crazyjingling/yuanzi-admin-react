import * as adminActions from '../../client/actions/admin';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';
import Utils from '../../helpers/utils';

import queryProps from '../../decorators/query-props';
import Feedbacks from '../../components/admin/panels/feedbacks';
import {feedbackConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import { Calendar } from 'react-date-range';
import countBy from 'lodash.countby';
@connect(
	(state) => ({
		feedbacks: state.feedbacks.data.items,
		count: state.feedbacks.data.count
	}),
	(dispatch) => bindActionCreators(adminActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 10,
	sort: 'createdAt',
	order: 'desc'
})
export default class FeedbacksContainer extends Component {
	static fragments = Feedbacks.fragments;

	static panelSettings = feedbackConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		feedbacks: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
	}

	getInitState() {
		return {
			searchValues: feedbackConfig.searchValues || {},
			imagesViewing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				feedbacks: {
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

	onViewImages(images) {
		event.preventDefault();
		this.setState({
			imagesViewing: true,
			viewImages: images
		});
	}

	cancelViewImages() {
		this.setState({
			imagesViewing: false
		});
	}
	render() {
		return (
			<div>
				<Feedbacks
					{...this.props}
					{...this.state}
					onViewImages={::this.onViewImages}
				/>
				{this.renderViewImages()}
			</div>
		);
	}

	renderViewImages() {
		if (this.state.imagesViewing) {
			const style = {margin: '5px',maxWidth: '200px', maxHeight: '200px'};
			let images = this.state.viewImages;
			return (
				<Lightbox  header={false} headerWithoutBorder={true}
						   onClose={this.cancelViewImages.bind(this)}>
					<div className='centered'>
						{images.map((item) => <image src={item} style={style}/>)}
					</div>
				</Lightbox>

			);
		}
	}
}
