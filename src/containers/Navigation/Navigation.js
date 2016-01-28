/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { NavHeader, UserMenus, ActivityMenus } from 'components';
class Navigation extends Component {

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <NavHeader />
            </li>
            <UserMenus />
            <ActivityMenus />
          </ul>

        </div>
      </nav>
    );
  }

}

export default Navigation;
