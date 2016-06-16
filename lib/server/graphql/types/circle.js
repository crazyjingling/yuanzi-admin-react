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
import {UserModel, CommentModel, ArticleModel, MediaModel} from '../../models';
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
		cover: {type: new GraphQLObjectType({
			name: 'coverCircleCover',
			fields: {
				_id: {
					type: GraphQLString,
					resolve: (media, params, options) => media._id || ''

				},
				ossUrl: {
					type: GraphQLString,
					resolve: (media, params, options) => media.ossUrl || ''

				}
			}
		}),
			async resolve (schemaEntry, params, options) {
				const media = await MediaModel.findOne({ossUrl: schemaEntry.cover}).select({_id: 1, ossUrl: 1}).exec();
				return {_id: media ? media._id : '', ossUrl: schemaEntry.cover};
			}},
		name: {type: GraphQLString},
		articlesCount: {type: GraphQLInt},
		membersCount: {type: GraphQLInt},
		summary: {type: GraphQLString},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}
	}
});

export default circleType;
