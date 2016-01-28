/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';

class FormItem extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    const type = props.type;
    let formItem = <input key={props.key} type={props.type} name={props.name} placeholder={props.name} className="form-control"/>;

    if (type === 'select') {
      const options = props.options.map(function (item) {
        return <option value={item.value}>{item.name}</option>;
      });
      formItem = <select key={props.key} name={props.name} className="select2_demo_1 form-control">{options}</select>;
    }

    return (
      <div className="col-sm-2">
        <div className="form-group">
          <label className="control-label">{props.label}</label>
          {formItem}
        </div>
      </div>
    );
  }
}

export default FormItem;
