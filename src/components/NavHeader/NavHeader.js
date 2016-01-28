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
import cx from 'classnames';
import s from './NavHeader.scss';
import l from '../../containers/Navigation/Navigation.scss';
import { Avatar } from 'components';

const title = 'NavHeader';

class NavHeader extends Component {
  render() {
    return (
      <div className={cx(l.navHeaderMid, 'dropdown profile-element')}>
        <span>
          <Avatar avatar={'/img/default-avatar.png'}/>
          <span className="block m-t-xs">
              <strong className="font-bold">{'nickname'}</strong>
          </span>
        </span>
        <a data-toggle="dropdown" className="dropdown-toggle" href="#">
          <span className="clear">
            <span className="text-muted text-xs block">{'role'}
              <b className="caret"></b>
            </span>
          </span>
        </a>
        <ul className="dropdown-menu animated fadeInRight m-t-xs">
          <li><Link className={l.link} to="/profile">个人信息</Link></li>
          <li><Link className={l.link} to="/profile">修改密码</Link></li>
          <li className="divider"></li>
          <li><Link className={l.link} to="/login">登出</Link></li>
        </ul>
      </div>

    );
  }

}

export default NavHeader;
