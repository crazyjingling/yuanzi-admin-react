import * as materialsActions from '../../client/actions/materials';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables, mergeFragments} from 'relax-framework';
import Utils from '../../helpers/utils';

import queryProps from '../../decorators/query-props';
import Materials from '../../components/admin/panels/materials';
import {materialConfig} from './containerInitConfig';
import Lightbox from '../../components/lightbox';
import QRCode from 'qrcode.react';
import { Calendar } from 'react-date-range';
import countBy from 'lodash.countby';
@connect(
	(state) => ({
		materials: state.materials.data.items,
		count: state.materials.data.count
	}),
	(dispatch) => bindActionCreators(materialsActions, dispatch)
)
@queryProps({
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'desc'
})
export default class MaterialsContainer extends Component {
	static fragments = mergeFragments({
		materialsCount: {
			count: 1
		}
	}, {materials: materialConfig.fragments.material});

	static panelSettings = materialConfig;

	static propTypes = {
		breadcrumbs: PropTypes.array.isRequired,
		materials: PropTypes.array,
		showFields: PropTypes.array,
		searchFields: PropTypes.array,
		query: PropTypes.object,
		count: PropTypes.number,
		hasQueryChanged: PropTypes.bool.isRequired,
		queryVariables: PropTypes.object.isRequired,
		removeMaterial: PropTypes.func.isRequired,
	}

	getInitState() {
		return {
			searchValues: materialConfig.searchValues || {},
			removing: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasQueryChanged) {
			const vars = {
				materials: {
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

	onRemove(data, event) {
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
		this.props.removeMaterial({
			material: {_id: 1}
		}, this.state.removeData._id)
			.done();
		this.setState({
			removing: false
		});

	}

	render() {
		return (
			<div>
				<Materials
					{...this.props}
					{...this.state}
					onRemove={::this.onRemove}
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
