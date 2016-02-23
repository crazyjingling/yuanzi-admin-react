import * as strategiesActions from '../../client/actions/strategies';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import Strategies from '../../components/admin/panels/strategies';
import {strategyConfig} from './containerInitConfig';
@connect(
  (state) => ({
    strategies: state.strategies.data.items,
    count: state.strategies.data.count
  }),
  (dispatch) => bindActionCreators(strategiesActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10,
  sort: '_id',
  order: 'desc'
})
export default class StrategiesContainer extends Component {
  static fragments = Strategies.fragments;

  static panelSettings = strategyConfig;

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    strategies: PropTypes.array,
    showFields: PropTypes.array,
    searchFields: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removeStrategy: PropTypes.func.isRequired,
    addStrategy: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      searchValues: strategyConfig.searchValues || {},
      lightbox: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        strategies: {
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

  onAddNew (newStrategy) {
    this.props
      .addStrategy({strategy: Strategies.fragments.strategies}, newStrategy)
      .then(() => {
        this.onCloseLightbox();
      });
  }

  onAddNewClick (event) {
    event.preventDefault();
    this.setState({
      lightbox: true
    });
  }

  onCloseLightbox () {
    this.setState({
      lightbox: false
    });
  }

  render () {
    return (
      <Strategies
        {...this.props}
        {...this.state}
        onCloseLightbox={::this.onCloseLightbox}
        onAddNew={::this.onAddNew}
        onAddNewClick={::this.onAddNewClick}
      />
    );
  }
}
