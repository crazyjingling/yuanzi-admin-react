import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

export default class DateRangePicker extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		dateFormat: PropTypes.string,
		selected: PropTypes.object.isRequired,
		maxDate: PropTypes.object,
		onChange: PropTypes.func.isRequired
	}
	getInitState(){
		return {
			startDate: this.props.selected['$gte'] ? moment(this.props.selected['$gte']) : "",
			endDate: this.props.selected['$lte'] ? moment(this.props.selected['$lte']) : "",
			selected: this.props.selected,
			dateFormat: 'YYYY-MM-DD'
		};
	}
	handleChangeStart(startDate){

		let selected = this.state.selected;
		selected['$gte'] = startDate.format(this.state.dateFormat);
		this.setState({
			startDate: startDate,
			selected: selected
		});
		this.props.onChange(this.props.id, this.state.selected);
	}
	handleChangeEnd(endDate){
		let selected = this.state.selected;
		selected['$lte'] = endDate.format(this.state.dateFormat);
		this.setState({
			endDate: endDate,
			selected: selected
		});
		this.props.onChange(this.props.id, this.state.selected);
	}

	render() {

		return (
			<div className="input-daterange input-group">
				<ReactDatePicker
					selected={this.state.startDate}
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					maxDate={this.props.maxDate || moment()}
					dateFormat={this.state.dateFormat}
					onChange={::this.handleChangeStart} />
				<span className="input-group-addon">to</span>
				<ReactDatePicker
					selected={this.state.endDate}
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					maxDate={this.props.maxDate || moment()}
					dateFormat={this.state.dateFormat}
					onChange={::this.handleChangeEnd} />
			</div>
		);
	}

}
