import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
var DateTimeField = require('react-bootstrap-datetimepicker');
import moment from 'moment';

export default class DatePicker extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		dateFormat: PropTypes.string,
		//selected: PropTypes.any.isRequired,
		maxDate: PropTypes.object,
		onChange: PropTypes.func.isRequired
	}
	getInitState(){
		return {
			dateFormat: 'YYYY-MM-DD HH:mm:ss'
		};
	}
	onChange(x) {
		this.props.onChange(this.props.id, x);
	}
	render() {
		//let selected = this.props.selected;
		//selected = this.props.selected || moment().format('YYYY-MM-DD HH:mm:ss');
		return (
			<DateTimeField ref={this.props.id}
					inputFormat={this.state.dateFormat}
				    maxDate={this.props.maxDate}
					onChange={::this.onChange}
			/>
		);
	}


}
