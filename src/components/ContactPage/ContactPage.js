/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import NavTop from '../../components/NavTop';
import s from './ContactPage.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Contact Us';

@withStyles(s)
class ContactPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div id="page-wrapper" className="gray-bg dashbard-1">
        <NavTop />
        {this.props.children}
      </div>
    );
  }

}

export default ContactPage;
