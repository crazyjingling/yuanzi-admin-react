import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';

import admin from './admin';
import colors from './colors';
import display from './display';
import dnd from './dnd';
import draft from './draft';
import elements from './elements';
import fonts from './fonts';
import media from './media';
import menu from './menu';
import menus from './menus';
import overlays from './overlays';
import page from './page';
import pageBuilder from './page-builder';
import pages from './pages';
import revisions from './revisions';
import schema from './schema';
import schemaEntry from './schema-entry';
import schemaList from './schema-list';
import schemas from './schemas';
import session from './session';
import settings from './settings';
import styles from './styles';
import symbols from './symbols';
import tabs from './tabs';
import user from './user';
import userEntry from './user-entry';
import users from './users';
import strategy from './strategy';
import strategies from './strategies';
import activity from './activity';
import activities from './activities';
import material from './material';
import materials from './materials';
import feedbacks from './feedbacks';
import topic from './topic';
import topics from './topics';
import labels from './labels';
import labelsPicker from './labels-picker';
import labelPickerByType from './labelPickerByType';
import label from './label';
import ownerPicker from './owner-picker';
import strategySearch from './strategy-search';
import orders from './orders';
import comments from './comments';
import works from './works';
const rootReducer = combineReducers({
	admin,
	overlays,
	elements,
	fonts,
	settings,
	page,
	pages,
	revisions,
	draft,
	pageBuilder,
	styles,
	symbols,
	schema,
	schemaEntry,
	schemaList,
	schemas,
	session,
	display,
	dnd,
	colors,
	media,
	menu,
	menus,
	tabs,
	user,
	userEntry,
	users,
	strategy,
	strategies,
	topic,
	topics,
	activity,
	activities,
	material,
	materials,
	feedbacks,
	labels,
	label,
	labelsPicker,
	labelPickerByType,
	ownerPicker,
	strategySearch,
	router,
	orders,
	comments,
	works
});

export default rootReducer;
