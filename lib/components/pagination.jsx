import clone from 'lodash.clone';
import React from 'react';
import {Component} from 'relax-framework';
import Utils from '../helpers/utils';
import Pagination from 'react-bootstrap/lib/Pagination';

export default class P extends Component {
	static propTypes = {
		url: React.PropTypes.string.isRequired,
		query: React.PropTypes.object,
		count: React.PropTypes.number,
	};

	static contextTypes = {
		location: React.PropTypes.object,
		history: React.PropTypes.object,
	};

	static defaultProps = {
		query: {
			page: 1,
			limit: 20
		},
		count: 0
	};
	handleSelect(eventKey) {
		const query = clone(this.props.query);
		query.page = eventKey;
		const url = Utils.parseQueryUrl(this.props.url, query);
		console.log(this.context)
		this.context.history.pushState(null, url);
	}

	render () {
		return (
			<div className='pagination pull-right'>
				<Pagination
					bsSize="medium"
					prev
					next
					first
					last
					ellipsis
					boundaryLinks
					items={Math.ceil(this.props.count / this.props.query.limit)}
					activePage={this.props.query.page}
					maxButtons={5}
					onSelect={this.handleSelect.bind(this)}
				/></div>
		);
	}

}
