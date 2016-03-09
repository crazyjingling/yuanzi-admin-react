import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from './animate';

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node
  }

  close (event) {
    event.preventDefault();
    this.props.onClose && this.props.onClose();
  }

  render () {
    return (
      <div className='modal'>
        <Animate transition='fadeIn'>
          <div className='modal-background'></div>
        </Animate>
        <Animate>
          <div className='modal-wrapper'>
            <div className='modal-close' onClick={this.props.onClose}>
              <i className='material-icons'>close</i>
              <span>Close</span>
            </div>
            <div className='modal-content-wrapper'>
              假发就离开的房间阿里山附近啊速度快房间打扫房间爱水立方敬爱的看打扫房间啊附件撒的积分拉伸的防静电
            </div>
          </div>
        </Animate>
      </div>
    );
  }
}
