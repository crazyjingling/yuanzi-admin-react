/**
 * Created by matonghe on 16/5/9.
 */
import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import {UserModel} from '../../models';
import strategyType from './strategy';
import activityType from './activity';
const commentInputType = new GraphQLInputObjectType({
	name: 'CommentInput',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		type: {type: GraphQLString},
		strategy: {
			type: new GraphQLInputObjectType({
				name: 'strategyCommentInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					}
				}
			})
		},
		event: {type: activityType,
			type: new GraphQLInputObjectType({
				name: 'eventComment',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					}
				}
			})},
		content: {type:GraphQLString},
		targetUser: {
			type: new GraphQLInputObjectType({
				name: 'targetUserInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					nickname: {
						type: GraphQLString
					}
				}
			})
		},
		commentUser: {
			type: new GraphQLInputObjectType({
				name: 'commentUserInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					nickname: {
						type: GraphQLString
					}
				}
			})
		},
		imagesCount: {type: GraphQLInt},
		images: {type: new GraphQLList(GraphQLString)},
		praiseCount: {type: GraphQLInt},
		reportCount: {type: GraphQLInt},
		isPassed: {type: GraphQLBoolean},
		createdAt: {type: GraphQLString}
	}
});

export default commentInputType;
