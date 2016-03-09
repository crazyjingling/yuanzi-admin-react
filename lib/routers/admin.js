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
import Strategy from '../containers/admin/strategy';
import Strategies from '../containers/admin/strategies';
import Topic from '../containers/admin/topic';
import Topics from '../containers/admin/topics';
import Labels from '../containers/admin/labels';

export default [
	<Route path='/admin' component={Admin}>
		<IndexRoute component={Pages} onEnter={gaSend}/>
		<Route path='users' component={Users} onEnter={gaSend}/>
		<Route path='users/new' component={User} onEnter={gaSend}/>
		<Route path='labels' component={Labels} onEnter={gaSend}/>
		<Route path='strategies' component={Strategies} onEnter={gaSend}/>
		<Route path='strategies/:id' component={Strategy} onEnter={gaSend}/>
		<Route path='topics' component={Topics} onEnter={gaSend}/>
		<Route path='topics/:id' component={Topic} onEnter={gaSend}/>
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
	</Route>
];
