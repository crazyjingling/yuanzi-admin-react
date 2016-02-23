import * as labelsActions from '../../client/actions/labels';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import Labels from '../../components/admin/panels/labels';
import {labelConfig} from './containerInitConfig';
@connect(
  (state) => ({
    labels: state.labels.data.items,
    count: state.labels.data.count
  }),
  (dispatch) => bindActionCreators(labelsActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 1,
  sort: '_id',
  order: 'desc'
})
export default class LabelsContainer extends Component {
  static fragments = Labels.fragments;

  static panelSettings = labelConfig;

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    labels: PropTypes.array,
    showFields: PropTypes.array,
    searchFields: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removeLabel: PropTypes.func.isRequired,
    addLabel: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      searchValues: labelConfig.searchValues || {},
      lightbox: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        labels: {
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

  onAddNew (newLabel) {
    this.props
      .addLabel({label: Labels.fragments.labels}, newLabel)
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
      <Labels
        {...this.props}
        {...this.state}
        onCloseLightbox={::this.onCloseLightbox}
        onAddNew={::this.onAddNew}
        onAddNewClick={::this.onAddNewClick}
      />
    );
  }
}
