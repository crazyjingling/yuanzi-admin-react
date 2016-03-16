import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

export default class DatePicker extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		dateFormat: PropTypes.string,
		selected: PropTypes.any.isRequired,
		maxDate: PropTypes.object,
		onChange: PropTypes.func.isRequired
	}
	getInitState(){
		return {
			dateFormat: this.props.dateFormat || 'YYYY-MM-DD HH:mm:ss'
		};
	}

	render() {
		let selected = this.props.selected;
		selected = this.props.selected ? moment(selected) : moment();
		return (
			<ReactDatePicker ref={this.props.id}
						dateFormat={this.state.dateFormat}
						selected={selected}
						maxDate={this.props.maxDate || moment()}
						onChange={::this.onChange}
			/>
		);
	}

	onChange(date) {
		this.props.onChange(this.props.id, date.format(this.state.dateFormat));
	}
}
