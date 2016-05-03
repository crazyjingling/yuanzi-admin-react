import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Loading from './loading';
import MenuBar from './menu-bar';
import TopMenu from './top-menu';

export default class Admin extends Component {
  static fragments = mergeFragments({
    session: {
      _id: 1,
      account: {
		  username: 1
	  },
      nickname: 1
    }
  }, TopMenu.fragments)

  static propTypes = {
    activePanelType: PropTypes.string,
    breadcrumbs: PropTypes.array,
    children: PropTypes.element.isRequired,
    user: PropTypes.object,
    loading: PropTypes.bool,
    removeTab: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    linkingData: PropTypes.bool.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    blurred: PropTypes.bool.isRequired
  }

  static defaultProps = {
    breadcrumbs: []
  }

  render () {
	  console.log(this.props.breadcrumbs)
    return (
    <div id="wrapper" className={cx('blurr', this.props.blurred && 'blurred', !this.props.editing && 'previewing', this.props.linkingData && 'pb-linking-data')}>
      {this.props.activePanelType !== 'pageBuild' && <MenuBar user={this.props.user} activePanelType={this.props.activePanelType} breadcrumbs={this.props.breadcrumbs} />}

      <div id="page-wrapper" className="gray-bg dashbard-1">
	      <div className="row wrapper border-bottom white-bg page-heading">
		      <div className="col-lg-10">
			      <h2>{this.props.activePanelType}</h2>
			      <ol className="breadcrumb">
				      {this.props.breadcrumbs.map((item, index) => {
					      return (
						      <li>
							      <a href="#">{item.label}</a>
						      </li>
					      );
				      })}

			      </ol>
		      </div>
	      </div>
	      <div className="wrapper wrapper-content animated fadeIn">
		      <div>
			      <div className="row">
				      <div className="col-lg-12">
					      <div className="ibox">
						      {this.props.children}
					      </div>
				      </div>
			      </div>
		      </div>
	      </div>
	      <div className="footer">
		      <div>
			      <strong>Copyright</strong> 北京千鱼教育科技服务有限公司 © 2014-2015
		      </div>
	      </div>
      </div>
    </div>
    );
  }
};
