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
import count from './count';
import circleType from './circle';
import {UserModel, CommentModel} from '../../models';
import Utils from '../../../helpers/utils';

const articleType = new GraphQLObjectType({
	name: 'Article',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		owner: {
			type: userType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		commentCount: {
			type: GraphQLInt,
			async resolve (schemaEntry, params, options) {
				return await CommentModel.count({strategy: schemaEntry._id}).exec();
			}
		},
		title: {type: GraphQLString},
		isDel: {type: GraphQLBoolean},
		reportsCount: {type: GraphQLInt},
		praisesCount: {type: GraphQLInt},
		collectedCount: {type: GraphQLInt},
		createdAt: {type: GraphQLString},
		updatedAt: {type: GraphQLString}
	}
});

export default articleType;
