import {Component} from 'relax-framework';
import Input from '../../../data-types/input';
import React from 'react';
import Lightbox from '../../../lightbox';
import OptionsList from '../../../options-list';

export default class EditLabel extends Component {
	static propTypes = {
		editingLabel: React.PropTypes.any,
		options: React.PropTypes.array,
		onEditClose: React.PropTypes.func.isRequired,
		addLabel: React.PropTypes.func.isRequired,
		updateLabel: React.PropTypes.func.isRequired,
		fragment: React.PropTypes.object.isRequired
	}

	getInitState() {
		return {
			editingLabel: this.props.editingLabel || {
				title: '',
				type: '',
				ownedType: '',
				display: false,
				color: '#FC6e51'
			}
		};
	}

	closeEdit() {
		this.props.onEditClose();
	}

	onChange(id, value) {
		const editingLabel = this.state.editingLabel;
		editingLabel[id] = value;
		this.setState({
			editingLabel: editingLabel
		});
	}

	onSubmit() {
		if (this.state.editingLabel._id) {
			this.props.updateLabel(this.props.fragment, this.state.editingLabel).then(() => this.closeEdit());
		} else {
			this.props.addLabel(this.props.fragment, this.state.editingLabel).then(() => this.closeEdit());
		}
	}

	render() {
		var isNew = this.props.editingLabel ? false : true;
		var title = isNew ? '添加标签' : '编辑 ' + this.state.editingLabel.title;
		var btn = isNew ? '添加' : '保存';

		return (
			<Lightbox className='small' onClose={this.props.onEditClose} title={title}>
				<form onSubmit={this.onSubmit.bind(this)}>
					<OptionsList options={this.props.options} values={this.state.editingLabel}
								 onChange={this.onChange.bind(this)}/>
					<input type='submit' hidden/>
					<a className='button button-primary' href='#' onClick={this.onSubmit.bind(this)}>{btn}</a>
				</form>
			</Lightbox>
		);
	}
}
