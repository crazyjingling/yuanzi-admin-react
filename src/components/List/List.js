/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { ListTable, SearchForm } from 'components';
class List extends Component {
  render() {
    return (
      <div className="ibox-content">
        <SearchForm />
        <ListTable />
      </div>
    );
  }
}

export default List;
