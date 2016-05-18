import React from 'react';
import {Component} from 'relax-framework';
import ImagePicker from '../../../../containers/data-types/image-picker'


export default class Step extends Component {
	static propTypes = {
		index: React.PropTypes.number.isRequired,
		step: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired
	}

	getInitState() {
		return {
			existsSteps: this.props.existsSteps
		};
	}
	onImageChange(mediaItem) {
		this.props.onChange(this.props.index, Object.assign({}, this.props.step,{imgUrl: {
				_id: mediaItem._id,
				ossUrl: mediaItem.ossUrl
			}}));
	}
	onDescChange(event) {
		this.props.onChange(this.props.index, Object.assign({},this.props.step,{description: event.target.value}));

	}

	render() {
		return (
			<div className="row">
				<div className="col-lg-2">
					<ImagePicker
					             value={this.props.step? this.props.step.imgUrl._id : ''}
					             width={140} height={140}
					             widthAndHeightStyle={{width: '140px', height: '140px'}}
					             onChange={::this.onImageChange}
					/>
				</div>
				<div className="col-lg-10">
									<textarea className="note-codable form-control" value={this.props.step? this.props.step.description : ''}
									          onChange={this.onDescChange.bind(this)}
									          placeholder="描述"/>
				</div>
			</div>
		);
	}
}
