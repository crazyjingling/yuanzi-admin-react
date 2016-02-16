import cx from 'classnames';
import merge from 'lodash.merge';
import find from 'lodash.find';
import React from 'react';
import {Component} from 'relax-framework';

import A from './a';
import Utils from '../helpers/utils';

export default class Search extends Component {
  static propTypes = {
    sorts: React.PropTypes.array.isRequired,
    url: React.PropTypes.string.isRequired,
    search: React.PropTypes.string.isRequired,
    searchFields: React.PropTypes.array.isRequired,
    query: React.PropTypes.object,
    history: React.PropTypes.object.isRequired
  }

  getInitState () {
    const state = Object.assign({},this.props.searchFields.map((item) =>{
      return {[item.key]: item.type === 'select' ? find(item.options, (option)=>option.selected).value: item.value}
    }));

    return {
      search: state
    };
  }

  searchChange = (event) => {
    console.log('=================================event.target', event.target);
    console.log('=================================event.target.value', event.target.value);
    this.setState({
      search: event.target.value
    });
  }

  searchSubmit = (event) => {
    event.preventDefault();
    const query = Object.assign({}, this.props.query || {});
    console.log('=================================query', query);
    if (this.state.search !== '') {
      merge(query, {search: this.props.search, s: this.state.search});
    } else {
      delete query.search;
      delete query.s;
    }

    const url = Utils.parseQueryUrl(this.props.url, query);

    this.props.history.pushState({}, url);
  }

  render () {
    return (
        <div id="DataTables_Table_0_filter" className="dataTables_filter">
          <form role="search" autocomplete='on'>
          <input type="text" style={{display:'none'}} />
          {this.props.searchFields && this.props.searchFields.map(this.renderFormItem, this)}
          <button className="btn btn-sm btn-primary pull-right" type="button" onClick={this.searchSubmit.bind(this)}>搜索</button>
        </form>
      </div>
    );
  }
  renderFormItem (searchField) {
      const type = searchField.type;
      let formItem = <input {...searchField} placeholder={searchField.name} className="form-control" onChange={this.searchChange.bind(this)}/>;

      if (type === 'select') {
        const options = searchField.options.map(function (item) {
          return <option value={item.value} selected={item.selected}>{item.name}</option>;
        });
        formItem = <select {...searchField}  onChange={this.searchChange.bind(this)} className="select2_demo_1 form-control">{options}</select>;
      }

      return (
          <div className="form-group">
            <label className="control-label">{searchField.label}</label>
            {formItem}
          </div>
      );
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
