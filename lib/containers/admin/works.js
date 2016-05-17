/**
 * Created by matonghe on 16/5/16.
 */

import * as workActions from '../../client/actions/work';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables, mergeFragments} from 'relax-framework';
import Utils from '../../helpers/utils';
import queryProps from '../../decorators/query-props';
import {workConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import { Calendar } from 'react-date-range';
import countBy from 'lodash.countby';
import Works from '../../components/admin/panels/works';
@connect(
	(state) => ({
		works: state.works.data.items,
		count: state.works.data.count
	}),
	(dispatch) => bindActionCreators(workActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	work: 'desc'
})
export default class WorksContainer extends Component {
	static fragments = mergeFragments({
		worksCount: {
			count: 1
		}
	}, {works: workConfig.fragments.work});
	static panelSettings = workConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		works: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		updateWork: PropTypes.func.isRequired
	}

	getInitState() {
		return {
			searchValues: workConfig.searchValues || {},
			lightbox: false,
			removing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				works: {
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

	onEdit(data, event) {
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
		var work = this.state.removeData;
		work.isDel = true;
		this.props.updateWork(workConfig.fragments, work).done();
		this.setState({
			removing: false
		});
	}

	onCloseLightbox() {
		this.setState({
			lightbox: false
		});
	}

	handleDateSelect(date) {
		this.setState({
			recommendAt: date
		});
	}

	render() {
		return (
			<div>
				<Works
					{...this.props}
					{...this.state}
					listSchema='work'
					onCloseLightbox={::this.onCloseLightbox}
					onEdit= {::this.onEdit}
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
