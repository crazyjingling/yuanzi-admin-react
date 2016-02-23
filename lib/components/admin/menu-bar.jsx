import A from '../a';
import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';
import Utils from '../../helpers/utils';
import {Avatar} from './elements'
export default class MenuBar extends Component {
    static propTypes = {
        user: React.PropTypes.object,
        activePanelType: React.PropTypes.string,
        breadcrumbs: React.PropTypes.array
    }

    getInitState() {
        return {
            userOpened: false
        };
    }

    render() {
        const links = [
            {
                type: 'settings',
                link: '/admin',
                label: 'General Settings'
            },
            {
                type: 'strategies',
                link: '#',
                label: '妙招管理',
				links: [
					{
						type: 'strategylist',
						link: '/admin/strategies',
						label: '妙招列表'
					},
					{
						type: 'strategyedit',
						link: '/admin/strategyedit',
						label: '添加妙招'
					}
				]
            },
			{
				type: 'topics',
				link: '#',
				label: '攻略管理',
				links: [
					{
						type: 'topiclist',
						link: '/admin/topics',
						label: '攻略列表'
					},
					{
						type: 'topicedit',
						link: '/admin/topicedit',
						label: '添加攻略'
					}
				]
			},
			{
				type: 'activities',
				link: '#',
				label: '活动管理',
				links: [
					{
						type: 'strategylist',
						link: '/admin/activities',
						label: '活动列表'
					},
					{
						type: 'strategyedit',
						link: '/admin/activityedit',
						label: '添加活动'
					}
				]
			},
			{
				type: 'labels',
				link: '#',
				label: '标签管理',
				links:[
					{
						type: 'labellist',
						link: '/admin/labels/strategy',
						label: '妙招标签'
					},
					{
						type: 'labeledit',
						link: '/admin/labels/talant',
						label: '达人标签'
					}
				]
			},
			{
				type: 'banners',
				link: '#',
				label: 'Banner 管理',
				links:[
					{
						type: 'bannerlist',
						link: '/admin/banners/index',
						label: '首页 Banner'
					},
					{
						type: 'banneredit',
						link: '/admin/banners/activity',
						label: '活动Banner'
					}
				]
			},
			{
				type: 'uploads',
				link: '#',
				label: '上传管理',
				links:[
					{
						type: 'uploadlist',
						link: '/admin/uploads',
						label: '上传列表'
					},
					{
						type: 'uploadedit',
						link: '/admin/uploads/upload',
						label: '上传页面'
					}
				]
			},
			{
				type: 'orders',
				link: '/admin/orders',
				label: '订单管理'
			},
			{
				type: 'feedbacks',
				link: '/admin/feedbacks',
				label: '意见反馈'
			},
			{
				type: 'systems',
				link: '#',
				label: '系统管理',
				links:[
					{
						type: 'userlist',
						link: '/admin/users',
						label: '用户列表'
					},
					{
						type: 'useredit',
						link: '/admin/useredit',
						label: '添加成员'
					}
				]
			},
			{
				type: 'pushs',
				link: '#',
				label: '推送管理',
				links:[
					{
						type: 'pushlist',
						link: '/admin/pushs',
						label: '推送列表'
					},
					{
						type: 'pushedit',
						link: '/admin/pushedit',
						label: '新建推送'
					}
				]
			},
			{
				type: 'profile',
				link: '/admin/profile',
				label: '个人设置'
			},
			{
				type: 'pages',
				link: '/admin/pages',
				label: 'Pages'
			},
            {
                type: 'schemas',
                link: '/admin/schemas',
                label: 'Schemas'
            },
            {
                type: 'menus',
                link: '/admin/menus',
                label: 'Menus'
            },
            {
                type: 'media',
                link: '/admin/media',
                label: 'Media'
            },
            {
                type: 'fonts',
                link: '/admin/fonts',
                label: 'Fonts'
            },
            {
                type: 'colors',
                link: '/admin/colors',
                label: 'Colors'
            },
            {
                type: 'users',
                link: '/admin/users',
                label: 'Users'
            }
        ];
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav metismenu" id="side-menu">
                        {this.renderNavHeader()}
                        {links.map(this.renderLink, this)}
                    </ul>
                </div>
            </nav>
        );
    }

    renderSecondLinks(link) {
        if(link.links && link.links.length) {
            return (
                <ul className="nav nav-second-level collapse">
                    {link.links.map(this.renderLink, this)}
                </ul>
            )
        }else return null;

    }

    renderLink(link) {
        const active = this.props.activePanelType === link.type || (this.props.breadcrumbs && this.props.breadcrumbs.length > 0 && this.props.breadcrumbs[0].type === link.type);
        return (
            <li key={link.type} className={cx(active && 'active')}>
                <A href={link.link}>
                    {link.label}
                    {link.links && link.links.length ?<span data-toggle="collapse" className="fa arrow" />:null}
                </A>
                {(link.links && link.links.length) && this.renderSecondLinks(link)}
            </li>
        );
    }

    renderNavHeader() {
        var url = Utils.getGravatarImage(this.props.user.email, 25) || '/img/default-avatar.png';

        return (
            <li className="nav-header">
                <div className="dropdown profile-element" style={{textAlign: 'center'}}>
                  <span>
                    <Avatar avatar={url} user={this.props.user}/>
                    <span className="block m-t-xs">
                        <strong className="font-bold">{this.props.user.name}</strong>
                    </span>
                  </span>
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                      <span className="clear">
                          <span className="text-muted text-xs block">{this.props.user.role || '普通用户'}
                              <b className="caret"></b>
                          </span>
                        </span>
                    </a>
                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                        <li>
                            <a href='/admin/logout'>
                                <i className='material-icons'>directions_run</i>
                                <span>Log out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}
