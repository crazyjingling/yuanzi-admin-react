import cx from 'classnames';
import merge from 'lodash.merge';
import React from 'react';
import {Component} from 'relax-framework';

import A from './a';
import Utils from '../helpers/utils';

export default class Filter extends Component {
  static propTypes = {
    sorts: React.PropTypes.array.isRequired,
    url: React.PropTypes.string.isRequired,
    search: React.PropTypes.string.isRequired,
    searchFields: React.PropTypes.array.isRequired,
    query: React.PropTypes.object,
    history: React.PropTypes.object.isRequired
  }

  getInitState () {
    return {
      search: (this.props.query && this.props.query.s) || ''
    };
  }

  searchChange (event) {
    this.setState({
      search: event.target.value
    });
  }

  searchSubmit (event) {
    event.preventDefault();
    const query = Object.assign({}, this.props.query || {});

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
      <div >
        <form onSubmit={this.searchSubmit.bind(this)}>
          {this.props.searchFields && this.props.searchFields.map(this.renderFormItem, this)}
        </form>
      </div>
    );
  }
  renderFormItem (searchField) {
      const type = searchField.type;
      let formItem = <input {...searchField} placeholder={searchField.name} className="form-control"/>;

      if (type === 'select') {
        const options = searchField.options.map(function (item) {
          return <option value={item.value}>{item.name}</option>;
        });
        formItem = <select {...searchField} className="select2_demo_1 form-control">{options}</select>;
      }

      return (
          <div>
            <div className="form-group">
              <label className="control-label">{searchField.label}</label>
              {formItem}
            </div>
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
