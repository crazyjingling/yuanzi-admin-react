/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
//import NavHeader from '../../components/NavHeader';
import ActivityMenus from '../../components/Menus/ActivityMenus';
import BannerMenus from '../../components/Menus/BannerMenus';
import CardMenus from '../../components/Menus/CardMenus';
import FeedbackMenus from '../../components/Menus/FeedbackMenus';
import LabelMenus from '../../components/Menus/LabelMenus';
import ProfileMenus from '../../components/Menus/ProfileMenus';
import PushMenus from '../../components/Menus/PushMenus';
import StrategyMenus from '../../components/Menus/StrategyMenus';
import SystemMenus from '../../components/Menus/SystemMenus';
import TopicMenus from '../../components/Menus/TopicMenus';
import UploadMenus from '../../components/Menus/UploadMenus';
import UserMenus from '../../components/Menus/UserMenus';
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">

            <UserMenus />
            <BannerMenus />
            <CardMenus />
            <TopicMenus />
            <StrategyMenus />
            <LabelMenus />
            <ActivityMenus />
            <FeedbackMenus />
            <PushMenus />
            <ProfileMenus />
            <UploadMenus />
            <SystemMenus />
          </ul>

        </div>
      </nav>
    );
  }

}

export default Navigation;
