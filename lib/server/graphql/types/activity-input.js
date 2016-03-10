import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userInputType from './user-input';
import labelInputType from './label-input';
import {UserModel, LabelModel, CommentModel} from '../../models';
const activityInputType = new GraphQLInputObjectType({
	name: 'ActivityInput',
	fields: {
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
		price: {type: GraphQLInt},
		priceType: {type: GraphQLString},
		isRecommended: {
			type: new GraphQLObjectType({
				name: 'isRecommendedActivityInputType',
				fields: {
					stateType: {
						type: GraphQLString
					},
					recommendAt: {
						type: GraphQLString
					}
				}
			})
		},
		commentCount: {
			type: GraphQLInt,
			async resolve (schemaEntry, params, options) {
				return await CommentModel.count({strategy: schemaEntry._id}).exec();
			}
		},
		commentReportRelated: {
			type: new GraphQLInputObjectType({
				name: 'commentReportActivityInputType',
				fields: {
					commentReportCount: {
						type: GraphQLInt,
						resolve: (commentReportRelated, params, options) => {
							let results = [];
							pluck(commentReportRelated, 'reportUsers').forEach(function (item) {
								results = results.concat(item);
							});
							return results.length;
						}
					},
					commentReportInfo: {
						type: GraphQLString,
						async resolve (commentReportRelated, params, options) {
							return JSON.stringify({comments: commentReportRelated});
						}
					}
				}
			}),
			async resolve (schemaEntry, params, options) {
				return await CommentModel.find({strategy: schemaEntry._id, reportUsers: {'$not':{'$size': 0}}})
					.select({
						_id: 1,
						content: 1,
						reportUsers: 1
					})
					.exec();
			}
		},
		startDate: {type: GraphQLString},
		viewCount: {type: GraphQLInt},
		sharedUsers: {type: new GraphQLList(GraphQLString)},
		sharedCount: {type: GraphQLInt},
		participants: {type: new GraphQLList(GraphQLString)},
		participantCount: {type: GraphQLInt},
		number: {type: GraphQLInt},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}

	}
});

export default activityInputType;
