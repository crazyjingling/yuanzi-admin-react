import React from 'react';
import {Component} from 'relax-framework';

import MediaItem from '../media-item';

export default class ImagePicker extends Component {
	static fragments = MediaItem.fragments

	static propTypes = {
		neededRemove: React.PropTypes.boolean,
		width: React.PropTypes.any,
		height: React.PropTypes.number,
		calcWidth: React.PropTypes.number,
		widthAndHeightStyle: React.PropTypes.object,
		borderRadiusStyle: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
		value: React.PropTypes.string.isRequired,
		openSelector: React.PropTypes.func.isRequired,
		onMount: React.PropTypes.func.isRequired,
		mounted: React.PropTypes.bool.isRequired,
		mediaItem: React.PropTypes.object
	}

	static defaultProps = {
		width: '100%',
		height: '100%'
	}

	componentDidMount() {
		const dom = this.refs.imageHolder;
		const rect = dom.getBoundingClientRect();

		const width = rect.width || Math.round(rect.right - rect.left);

		this.props.onMount(width);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.props.value !== nextProps.value ||
			this.props.mounted !== nextProps.mounted ||
			this.props.mediaItem !== nextProps.mediaItem
		);
	}

	onClick(event) {
		event.preventDefault();
		this.props.openSelector();
	}

	render() {
		let widthAndHeightStyle;
		if (this.props.widthAndHeightStyle) {
			widthAndHeightStyle = this.props.widthAndHeightStyle;
		} else {
			widthAndHeightStyle = {
				width: this.props.width,
				height: this.props.height
			};
		}
		return (
			<div className='image-picker-wrapper'>
				<div className='image-picker' style={widthAndHeightStyle}>
					<div className='image-selected' style={this.props.borderRadiusStyle} onClick={this.onClick.bind(this)} ref='imageHolder'>
						{this.renderSelected()}
						<div className='image-change' style={this.props.borderRadiusStyle}>选择图片</div>
					</div>
				</div>
				{this.renderUnselect()}
			</div>
		);
	}

	renderUnselect() {
		if (this.props.value && this.props.value !== '' && this.props.neededRemove) {
			return (
				<div
					className='button button-faded-grey full vmargined'
					style={{width: this.props.width}}
					onClick={this.props.onChange.bind(this, '')}>
					移除图片
				</div>
			);
		}
	}

	renderSelected() {
		if (this.props.mounted && this.props.mediaItem && this.props.mediaItem._id) {
			return <MediaItem item={this.props.mediaItem} width={this.props.calcWidth} height={this.props.height}
							  useThumbnail={false}/>;
		}
	}
}
