import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';

import Breadcrumbs from '../../../breadcrumbs';
import {getGravatarImage} from '../../../../helpers/utils';

export default class LabelEdit extends Component {
  static fragments = {
    label: {
      email: 1,
      name: 1,
      labelname: 1,
      date: 1
    }
  }

  static propTypes = {
    label: React.PropTypes.object.isRequired,
    breadcrumbs: React.PropTypes.array.isRequired
  }

  render () {
    const label = this.props.label;
    const url = getGravatarImage(label.email, 70);
    const createdDate = moment(label.date).format('MMMM Do YYYY');

    const breadcrumbs = this.props.breadcrumbs.slice();
    breadcrumbs.push({
      label: this.props.label.name
    });

    return (
      <div className='admin-user-edit'>
        <div className='filter-menu'>
          <Breadcrumbs data={breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <div className='list'>
            <div>
              <div className='image-part'>
                <img src={url} />
              </div>
              <div className='info-part'>
                {label.name}
              </div>
            </div>
            <div className='infos'>
              <div className='info'>
                <i className='material-icons'>today</i>
                <span>Created at</span>
                <div>{createdDate}</div>
              </div>
              <div className='info'>
                <i className='material-icons'>person</i>
                <span>Labelname</span>
                <div>{label.labelname}</div>
              </div>
              <div className='info'>
                <i className='material-icons'>mail</i>
                <span>Email</span>
                <div>{label.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
