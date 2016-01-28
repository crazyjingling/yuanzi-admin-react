/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <div className="wrapper wrapper-content animated fadeIn">
        <div className="p-w-md m-t-sm">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
