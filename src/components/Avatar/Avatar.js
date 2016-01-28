/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';

class Avatar extends Component {
  handleClick(event) {
    event.preventDefault();
  }
  render() {
    return (
      <a href={'/users/userId'} onClick={this.handleClick.bind(this)}>
        <img alt="image" className="img-circle" height="48px" width="48px" src="/img/a1.jpg"/>
      </a>
    );
  }

}

export default Avatar;
