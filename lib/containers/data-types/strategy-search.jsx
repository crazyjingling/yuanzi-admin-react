import * as adminActions from '../../client/actions/admin';

import {forEach,indexOf,concat} from 'lodash';
import pluck from 'lodash.pluck';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';
import StrategySearch from '../../components/data-types/strategy-search';
@connect(
	(state) => ({
		strategySearch: state.strategySearch.data.items,
		errors: state.strategySearch.errors
	}),
	(dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class StrategySearchContainer extends Component {
	static fragments = {
		strategySearch: {
			_id: 1,
			title: 1,
			cover: 1
		}
	}

	static propTypes = {
		selectedStrategies: PropTypes.array.isRequired,
		strategySearch: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
		getAdmin: PropTypes.func.isRequired
	}

	onSearch(searchValue){
		const search = JSON.stringify({
			title: {
				value: searchValue,
				type: 'text'
			}
		});
		this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {
			strategySearch: {
				search: {
					value: search,
					type: 'String!'
				}
			}
		})).done();
	}

	render() {
		return (<StrategySearch strategies={this.props.strategySearch}
								selectedStrategies={this.props.selectedStrategies}
								onChange={this.props.onChange}
								onSearch={::this.onSearch}
		/>);
	}
}
