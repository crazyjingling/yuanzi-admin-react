import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Image from './image';
import {getMediaType} from '../helpers/mime-types';

export default class MediaItem extends Component {
  static fragments = {
    media: {
      _id: 1,
      thumbnail: 1,
      url: 1,
      ossUrl: 1,
      name: 1,
      type: 1,
		size: 1,
		dimension: {
			width: 1,
			height: 1
		}
    }
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    useThumbnail: PropTypes.bool
  }

  static defaultProps = {
    useThumbnail: true
  }

  render () {
    const {item, useThumbnail, width, height} = this.props;
    let result = <span />;
    const type = getMediaType(this.props.item.type);

    if (type === 'image') {
      if (item.preview) {
        result = (
          <img src={`${item.preview}`} style={{minWidth: width, minHeight: height}} title={`${item.dimension.width}*${item.dimension.height} ${item.size}`}/>
        );
      } else if (useThumbnail) {
        result = (
          <img src={`${item.ossUrl}`} width={width} height={height} title={`${item.dimension.width}*${item.dimension.height} ${item.size}`}/>
        );
      } else {
        result = (
          <Image media={item} id={item._id} width={width} height={height} />
        );
      }
    } else if (type === 'favicon') {
      result = (
        <img src={`${item.ossUrl || item.preview}`} style={{top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}} title={`${item.dimension.width}*${item.dimension.height} ${item.size}`}/>
      );
    } else if (type === 'video') {
      result = (
        <div className='not-image'>
          <i className='material-icons'>videocam</i>
          <span>{item.name}</span>
        </div>
      );
    } else if (type === 'audio') {
      result = (
        <div className='not-image'>
          <i className='material-icons'>music_note</i>
          <span>{item.name}</span>
        </div>
      );
    }

    return <div className='media-item'>{result}</div>;
  }
}
