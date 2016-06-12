import React from 'react';
import {Component} from 'relax-framework';
import ImagePicker from '../../../../containers/data-types/image-picker'
var ReactQuill = require('react-quill');

export default class Step extends Component {
	static propTypes = {
		index: React.PropTypes.number.isRequired,
		step: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
		onDel: React.PropTypes.func.isRequired
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
		this.props.onChange(this.props.index, Object.assign({},this.props.step,{description: event}));

	}
	onDel(event) {
		console.log('delete')
		this.props.onDel(this.props.index, Object.assign({},this.props.step,{description: event}));

	}

	render() {
		return (
			<div className="row">
				<div className="col-lg-2">
					<ImagePicker
					             value={this.props.step && this.props.step.imgUrl? this.props.step.imgUrl._id : ''}
					             width={140} height={140}
					             widthAndHeightStyle={{width: '140px', height: '140px'}}
					             onChange={::this.onImageChange}
					/>
				</div>
				<div className="col-lg-10">

					<ReactQuill style={{ border: '1px solid #e5e6e7'}}
					            theme="snow"
					            value={this.props.step? this.props.step.description : ''}
					            onChange={::this.onDescChange} />
				</div>
				<div className="hr-line-dashed"></div>
				<div className="col-lg-10">
					<button className="btn btn-primary btn-circle" type="button"
							onClick={::this.onDel}>
						<i className="fa fa-minus"/>
					</button>
				</div>
			</div>
		);
	}
}
