/**
 * Created by matonghe on 16/6/14.
 */
import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import articleType from './article';
import contactType from './contact';
import count from './count';
import {UserModel, CommentModel, ArticleModel} from '../../models';
import Utils from '../../../helpers/utils';

const circleType = new GraphQLObjectType({
	name: 'Circle',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		owner: {
			type: userType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		articles: {
			type: articleType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.event && await ArticleModel.findById(schemaEntry.event).exec();
			}
		},
		name: {type: GraphQLString},
		summary: {type: GraphQLString},
		createdAt: {type: GraphQLString}
	}
});

export default circleType;
