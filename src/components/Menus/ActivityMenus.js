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
import s from '../Navigation/Navigation.scss';

class ActivityMenus extends Component {

  render() {
    return (
      <li>
        <Link to="/activity">
          <i className="fa fa-bar-chart-o"></i>
          <span className="nav-label">活动管理</span>
        </Link>
      </li>
    );
  }

}

export default ActivityMenus;
