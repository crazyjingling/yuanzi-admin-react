/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { Content } from 'containers';
import { NavTop } from 'components';
class ContentPage extends Component {

  render() {
    return (
      <div id="page-wrapper" className="gray-bg dashbard-1">
        <NavTop />
        <Content />
      </div>
    );
  }

}

export default ContentPage;
