import React from 'react';
import {Component} from 'relax-framework';
import Strategy from './strategy';

export default class StrategySearch extends Component {
	static propTypes = {
		strategies: React.PropTypes.array.isRequired,
		selectedStrategies: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func.isRequired,
		onSearch: React.PropTypes.func.isRequired,

	}

	getInitState() {
		return {
			searchValue: ''
		};
	}

	onSearchChange(event) {
		this.setState({searchValue: event.target.value});
	}
	onSearch(event){
		event.preventDefault();
		this.props.onSearch(this.state.searchValue);
	}

	render() {
		return (
			<div>
				<div>
					<input className="form-control" value={this.state.searchValue}
						   onChange={this.onSearchChange.bind(this)}
						   placeholder="描述"/>
					<a className='button button-primary' href='#'
					   onClick={this.onSearch.bind(this)}>搜索</a>

				</div>
				<div>
					{this.props.strategies.map((item)=><Strategy strategy={item} selectedStrategies={this.props.selectedStrategies} onChange={this.props.onChange}/>)}
				</div>
				<div>
					<div>已选妙招</div>
					{this.props.selectedStrategies.map((item)=><Strategy strategy={item} selectedStrategies={this.props.selectedStrategies} onChange={this.props.onChange}/>)}
				</div>
			</div>
		);
	}
}
