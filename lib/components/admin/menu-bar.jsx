import A from '../a';
import React from 'react';
import {indexOf,concat} from 'lodash';
import pluck from 'lodash.pluck';
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
                type: 'users',
                link: '#',
                label: '用户管理',
				links: [
					{
						type: 'users',
						link: '/admin/users',
						label: '用户列表'
					},
					{
						type: 'user',
						link: '/admin/users/new',
						label: '添加用户'
					}
				]
            },
            {
                type: 'strategies',
                link: '#',
                label: '妙招管理',
				links: [
					{
						type: 'strategies',
						link: '/admin/strategies',
						label: '妙招列表'
					},
					{
						type: 'strategy',
						link: '/admin/strategies/new',
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
						type: 'topics',
						link: '/admin/topics',
						label: '攻略列表'
					},
					{
						type: 'topic',
						link: '/admin/topics/new',
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
						type: 'activities',
						link: '/admin/activities',
						label: '活动列表'
					},
					{
						type: 'activity',
						link: '/admin/activities/new',
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
						type: 'labels',
						link: '/admin/labels',
						label: '标签列表'
					}
				]
			},
			{
				type: 'banners',
				link: '/admin/banners/index',
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
						label: '活动 Banner'
					}
				]
			},
			{
				type: 'materials',
				link: '#',
				label: '上传管理',
				links:[
					{
						type: 'materials',
						link: '/admin/materials',
						label: '上传列表'
					},
					{
						type: 'material',
						link: '/admin/materials/new',
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
				type: 'systemUsers',
				link: '#',
				label: '系统管理',
				links:[
					{
						type: 'systemUsers',
						link: '/admin/systemusers',
						label: '用户列表'
					},
					{
						type: 'systemUser',
						link: '/admin/systemuser',
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
            // {
				// type: 'pages',
				// link: '/admin',
				// label: 'Pages'
            // },
            // {
            //     type: 'schemas',
            //     link: '/admin/schemas',
            //     label: 'Schemas'
            // },
            // {
            //     type: 'menus',
            //     link: '/admin/menus',
            //     label: 'Menus'
            // },
            // {
            //     type: 'media',
            //     link: '/admin/media',
            //     label: 'Media'
            // },
            // {
            //     type: 'fonts',
            //     link: '/admin/fonts',
            //     label: 'Fonts'
            // },
            // {
            //     type: 'colors',
            //     link: '/admin/colors',
            //     label: 'Colors'
            // }
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
		let linkTypes = [link.type];
		if(link.links){
			linkTypes = concat(linkTypes,pluck(link.links, 'type'));
		}

        const active = indexOf(linkTypes,this.props.activePanelType) !==-1
			|| (this.props.breadcrumbs && this.props.breadcrumbs.length > 0 && indexOf(linkTypes,this.props.breadcrumbs[0].type) !==-1);
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
		//todo: getGravatarImage
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
