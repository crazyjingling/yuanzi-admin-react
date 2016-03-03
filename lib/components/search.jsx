import cx from 'classnames';
import merge from 'lodash.merge';
import find from 'lodash.find';
import React from 'react';
import {Component} from 'relax-framework';

import A from './a';
import Utils from '../helpers/utils';
import LabelPicker from '../containers/data-types/label-picker';
export default class Search extends Component {
  static propTypes = {
    sorts: React.PropTypes.array.isRequired,
    url: React.PropTypes.string.isRequired,
    search: React.PropTypes.object.isRequired,
    searchFields: React.PropTypes.array.isRequired,
    query: React.PropTypes.object,
    history: React.PropTypes.object.isRequired
  }

  getInitState () {
    return {
      search: this.props.search || {},
    };
  }
// {search: {type: {value: 'xxxxx'}}}
  searchChange = (id, event) => {
	  event && event.preventDefault();
	  const search = this.state.search;
	  search[id.id || id] = {};

	  if (id.label) {
		  search[id.id || id]._id = {value: id.value, type: 'select'};
	  } else {
		  search[id.id || id].value = event.target.value;

	  }

    this.setState({search: search});
  }

  searchSubmit = (event) => {
    event.preventDefault();
    const query = Object.assign({}, this.props.query || {});

    if (this.state.search !== {}) {
      merge(query, {search: JSON.stringify(this.state.search), s: this.state.search});
    } else {
      delete query.search;
      delete query.s;
    }
    const url = Utils.parseQueryUrl(this.props.url, query);
    //todo: pushState操作如何触发 getAdmin action ???
    this.props.history.pushState({}, url);
  }

  render () {
    return (
        <div id="DataTables_Table_0_filter" className="dataTables_filter">
          <form role="search" autoComplete='on'>
          <input type="text" style={{display:'none'}} />
          {this.props.searchFields && this.props.searchFields.map(this.renderFormItem, this)}
          <button className="btn btn-sm btn-primary pull-right" type="button" onClick={this.searchSubmit.bind(this)}>搜索</button>
        </form>
      </div>
    );
  }
  renderFormItem (searchField) {
      const type = searchField.type;
      let formItem;

      if (type === 'select') {
        const defaultValue = find(searchField.options, (option)=>option.selected).value;
        const options = searchField.options.map(function (item) {
          return <option value={item.value}>{item.name}</option>;
        });
        formItem = <select {...searchField} defaultValue={defaultValue} onChange={this.searchChange.bind(this, searchField.key)} className="select2_demo_1 form-control">{options}</select>;
      }else{
		  formItem= <input
			  {...searchField}
			  placeholder={searchField.name}
			  className="form-control"
			  onChange={this.searchChange.bind(this)}
			  value={this.state[searchField.key]}/>
	  }

	  
	  if(type === 'labelPicker'){
		  return (
			  <LabelPicker onChange={::this.searchChange}
						   value={this.state.search.ownedType ? this.state.search.ownedType._id : 'all'}
						   option={{
										id: 'ownedType',
										label: '所属标签分类',
										isAllShow: true
									}}
			  />
		  )
	  }else{
		  return (
			  <div className="form-group" key={searchField.key}>
				  <label className="control-label">{searchField.label}</label>
				  {formItem}
			  </div>
		  );
	  }

  }
  renderSortButton (button, key) {
    let active = false;
    let icon = 'arrow_drop_down';

    var query = Object.assign({}, this.props.query || {}, {
      sort: button.property,
      order: 'asc'
    });

    if (this.props.query && this.props.query.sort && this.props.query.sort === button.property) {
      active = true;
      if (!this.props.query.order || this.props.query.order === 'asc') {
        icon = 'arrow_drop_up';
        query.order = 'desc';
      }
    }

    return (
      <A
        className={cx('button-filter', active && 'active')}
        href={Utils.parseQueryUrl(this.props.url, query)}
        key={key}
      >
        <span>{button.label}</span>
        {active && <i className='material-icons'>{icon}</i>}
      </A>
    );
  }
}
