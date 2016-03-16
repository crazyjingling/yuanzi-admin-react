import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Content from './content';
import Filters from './filters';
import SearchBar from './search-bar';
import Selected from './selected';

export default class MediaSelector extends Component {
  static fragments = mergeFragments(Content.fragments, Selected.fragments)

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    mediaItem: PropTypes.object,
    changeView: PropTypes.func.isRequired,
    onAddMedia: PropTypes.func.isRequired,
    mimeTypes: PropTypes.array.isRequired,
    removeMediaItem: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='modal-content media-selector'>
          <SearchBar
			  onClose={this.props.onClose}
			  onCrop={this.props.onCrop}
            view={this.props.view}
            changeView={this.props.changeView}
            onAddMedia={this.props.onAddMedia}
            mimeTypes={this.props.mimeTypes}
          />
          <Content {...this.props} />
      </div>
    );
  }
}
