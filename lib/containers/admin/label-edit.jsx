import React from 'react';
import {connect} from 'react-redux';
import {Component} from 'relax-framework';

import LabelEdit from '../../components/admin/panels/label-edit';

@connect(
  (state) => ({
    label: state.label.data,
    errors: state.label.errors
  })
)
export default class LabelEditContainer extends Component {
  static fragments = LabelEdit.fragments

  static panelSettings = {
    activePanelType: 'labelEdit',
    breadcrumbs: [
      {
        label: 'Labels',
        type: 'labels',
        link: '/admin/labels'
      }
    ]
  }

  static propTypes = {
    label: React.PropTypes.object.isRequired,
    breadcrumbs: React.PropTypes.array.isRequired
  }

  render () {
    return (
      <LabelEdit
        {...this.props}
        {...this.state}
      />
    );
  }
}
