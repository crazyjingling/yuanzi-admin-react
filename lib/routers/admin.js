import React from 'react';
import {Route, IndexRoute} from 'react-router';

import gaSend from '../client/helpers/ga-send';
import Admin from '../containers/admin';
import Colors from '../containers/admin/colors';
import Fonts from '../containers/admin/fonts';
import MediaManager from '../containers/admin/media-manager';
import Menu from '../containers/admin/menu';
import Menus from '../containers/admin/menus';
import Page from '../containers/admin/page';
import PageBuild from '../containers/admin/page-build';
import Pages from '../containers/admin/pages';
import Schema from '../containers/admin/schema';
import SchemaEntry from '../containers/admin/schema-entry';
import SchemaList from '../containers/admin/schema-list';
import Schemas from '../containers/admin/schemas';
import Settings from '../containers/admin/settings';
import User from '../containers/admin/user';
import Users from '../containers/admin/users';
import SystemUser from '../containers/admin/system-user';
import SystemUsers from '../containers/admin/system-users';
import Strategy from '../containers/admin/strategy';
import Strategies from '../containers/admin/strategies';
import Activity from '../containers/admin/activity';
import Activities from '../containers/admin/activities';
import Material from '../containers/admin/material';
import Materials from '../containers/admin/materials';
import Topic from '../containers/admin/topic';
import Topics from '../containers/admin/topics';
import Labels from '../containers/admin/labels';
import Feedbacks from '../containers/admin/feedbacks';
import Orders from '../containers/admin/orders';
import Comments from '../containers/admin/comments';
import Works from '../containers/admin/works';
import Podcast from '../containers/admin/podcast';
import Podcasts from '../containers/admin/podcasts';
import Circles from '../containers/admin/circles';
import Articles from '../containers/admin/articles';
export default [
	<Route path='/admin' component={Admin}>
		<IndexRoute component={Users} onEnter={gaSend}/>
		<Route path='users' component={Users} onEnter={gaSend}/>
		<Route path='users/new' component={User} onEnter={gaSend}/>
		<Route path='labels' component={Labels} onEnter={gaSend}/>
		<Route path='strategies' component={Strategies} onEnter={gaSend}/>
		<Route path='strategies/:id' component={Strategy} onEnter={gaSend}/>
		<Route path='topics' component={Topics} onEnter={gaSend}/>
		<Route path='topics/:id' component={Topic} onEnter={gaSend}/>
		<Route path='activities' component={Activities} onEnter={gaSend}/>
		<Route path='activities/:id' component={Activity} onEnter={gaSend}/>
		<Route path='materials' component={Materials} onEnter={gaSend}/>
		<Route path='materials/:id' component={Material} onEnter={gaSend}/>
		<Route path='feedbacks' component={Feedbacks} onEnter={gaSend}/>
		<Route path='systemuser' component={SystemUser} onEnter={gaSend}/>
		<Route path='systemusers' component={SystemUsers} onEnter={gaSend}/>
		<Route path='orders' component={Orders} onEnter={gaSend}/>
		<Route path='pages' component={Pages} onEnter={gaSend}/>
		<Route path='pages/:id' component={Page} onEnter={gaSend}/>
		<Route path='page/:id' component={PageBuild} onEnter={gaSend}/>
		<Route path='schemas' component={Schemas} onEnter={gaSend}/>
		<Route path='schemas/:id' component={Schema} onEnter={gaSend}/>
		<Route path='schema/:id' component={SchemaList} onEnter={gaSend}/>
		<Route path='schema/:id/:entryId' component={SchemaEntry} onEnter={gaSend}/>
		<Route path='media' component={MediaManager} onEnter={gaSend}/>
		<Route path='menus' component={Menus} onEnter={gaSend}/>
		<Route path='menus/:id' component={Menu} onEnter={gaSend}/>
		<Route path='fonts' component={Fonts} onEnter={gaSend}/>
		<Route path='colors' component={Colors} onEnter={gaSend}/>
		<Route path='comments' component={Comments} onEnter={gaSend}/>
		<Route path='works' component={Works} onEnter={gaSend}/>
		<Route path='podcasts/:id' component={Podcast} onEnter={gaSend}/>
		<Route path='podcasts' component={Podcasts} onEnter={gaSend}/>
		<Route path='circles' component={Circles} onEnter={gaSend}/>
		<Route path='articles' component={Articles} onEnter={gaSend}/>
	</Route>
];
