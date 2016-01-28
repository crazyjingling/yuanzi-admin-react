/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { Avatar } from 'components';

class TableItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const showFields = this.props.showFields;
    return (
      <tr>
        {showFields.map((item) => {
          const data = this.props.data;
          let field = data;
          const type = item.type;

          if (item.key.indexOf('.') !== -1) {
            const keys = item.key.split('.');
            for (let i of keys) {
              field = field[i];
            }
          } else {
            field = field[item.key];
          }
          let inner;
          switch (type) {
            case 'avatar':
              inner = <Avatar avatar={field} userId={data.owner.userId}/>;
              break;
            case 'image':
              inner = <img src={field} style={{ maxWidth: '40px' }} />;
              break;
            default:
              inner = field;
          }
          return <td>{inner}</td>;
        })}
      </tr>
    );
  }
}

export default TableItem;
