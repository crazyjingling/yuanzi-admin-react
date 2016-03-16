import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import {getBestImageUrl} from '../helpers/utils';

export default class Image extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		media: PropTypes.object,
		width: PropTypes.number.isRequired,
		height: PropTypes.number,
		editing: PropTypes.bool
	}

	render() {
		if (this.props.id && this.props.id !== '') {
			//var extraProps = {};

			//forEach(this.props, (value, key) => {
			//  if (key !== 'id' && key !== 'width' && key !== 'height') {
			//    extraProps[key] = value;
			//  }
			//});
			//console.log('=================================extraProps', extraProps);
			return (
				<img src={this.props.media.ossUrl} {...this.props}
					 title={`${this.props.media.dimension.width}*${this.props.media.dimension.height} ${this.props.media.size}`}/>
			);
		} else if (this.props.editing) {
			const style = {};

			if (this.props.height) {
				style.height = this.props.height;
			}

			return (
				<div className='dummy-placeholder' style={style}>
					<i className='fa fa-image'></i>
				</div>
			);
		}

		return null;
	}
}
