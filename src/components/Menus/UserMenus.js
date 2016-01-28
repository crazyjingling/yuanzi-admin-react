/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class UserMenus extends Component {

  render() {
    return (
      <li>
        <i className="fa fa-bar-chart-o"></i>
        <span className="nav-label">用户管理</span>
        <span className="fa arrow"></span>
        <ul className="nav nav-second-level collapse">
          <li>
            <Link to="/view/users">用户列表</Link>
          </li>
          <li>
            <Link to="/graph_flot.html">添加用户</Link>
          </li>
        </ul>
      </li>
    );
  }

}

export default UserMenus;
