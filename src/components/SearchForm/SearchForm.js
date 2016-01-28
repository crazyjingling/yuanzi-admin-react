/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { FormItem } from 'components';
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.formItemsList = [{
      key: 'name',
      name: 'name',
      label: '姓名',
      type: 'text',
      value: ''
    }, {
      key: 'statue',
      name: 'statue',
      options: [
        { name: 'mahui', value: '马慧' },
        { name: 'mahui1', value: '马慧1' },
        { name: 'mahui2', value: '马慧2' },
        { name: 'mahui3', value: '马慧3' },
        { name: 'mahui4', value: '马慧4' },
      ],
      label: '状态',
      type: 'select'
    }];
    this.state.searchData = {
      name: '默认值',
      statue: '马慧',
    };
    this.state.data = [];
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log('=================================handleSubmit');
  }

  render() {
    const formItemsList = this.state.formItemsList;
    const formItems = formItemsList.map(item => {
      return <FormItem key={item.key} {...item}/>;
    });

    return (
      <div className="row">
        <form>
          {formItems}
          <button className="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit" onClick={this.handleSubmit.bind(this)}>搜索</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
