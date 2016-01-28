/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { Navigation, ContentPage, Content } from 'containers';
import { List } from 'components';
import Helmet from 'react-helmet';

class Home extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    params: PropTypes.object,
    error: PropTypes.object
  };
  render() {
    console.log('=================================this.props.children', this.props.children);
    return (
      <div id="wrapper">
        <Helmet title="Home"/>
        <Navigation router={this.props.params.name}/>
        <ContentPage>
          <Content>
            {this.props.children}
          </Content>
        </ContentPage>
      </div>
    );
  }

}

export default Home;
