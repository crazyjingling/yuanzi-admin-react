/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';

const title = 'Processing';

class Processing extends Component {
  static
  contextTypes = {
    onSetTitle: PropTypes.func.isRequired,

  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }
  const styleTrans = {
    transform: translate3d(100, 0, 0)
  }
  render() {
    return (
      <div className="pace  pace-inactive">
        <div className="pace-progress" data-progress-text="100%" data-progress="99"
             style={styleTrans}>
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>
    );
  }

}

export default Processing;
