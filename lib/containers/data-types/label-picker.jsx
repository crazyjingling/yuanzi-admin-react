import * as adminActions from '../../client/actions/admin';

import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import Combobox from '../../components/data-types/combobox';

@connect(
  (state) => ({
    labels: state.labels.data.items
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class LabelPickerContainer extends Component {
  static fragments = {
    labels: {
      _id: 1,
      title: 1
    }
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    labels: PropTypes.array.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {})).done();
  }

  render () {
    const labels = [];
    const values = [];

    forEach(this.props.labels, (label) => {
      labels.push(label.title);
      values.push(label._id);
    });

    return (
      <Combobox
        value={this.props.value}
        onChange={this.props.onChange}
        values={values}
        labels={labels}
      />
    );
  }
}
