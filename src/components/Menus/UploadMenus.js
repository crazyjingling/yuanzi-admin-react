/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import Link from '../../components/Link';
import s from '../Navigation/Navigation.scss';

class UploadMenus extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <li>
        <Link className={s.link} to="/upload">
          <i className="fa fa-bar-chart-o"></i>
          <span className="nav-label">上传管理</span>
          <span className="fa arrow"></span>
        </Link>
        <ul className="nav nav-second-level collapse">
          <li>
            <Link className={s.link} to="/graph_flot.html">上传</Link>
          </li>
        </ul>
      </li>
    );
  }

}

export default UploadMenus;
