import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import labelType from './label';
import count from './count';
import {UserModel, LabelModel, CommentModel, PhotoModel} from '../../models';
import Utils from '../../../helpers/utils';
import pluck from 'lodash.pluck';

const activityType = new GraphQLObjectType({
	name: 'Activity',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		owner: {
			type: userType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		title: {type: GraphQLString},
		price: {type: GraphQLInt},
		priceType: {type: GraphQLString},
		isRecommended: {
			type: new GraphQLObjectType({
				name: 'isRecommendedActivityType',
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
			type: new GraphQLObjectType({
				name: 'commentReportActivityType',
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
		endDate: {type: GraphQLString},
		viewCount: {type: GraphQLInt},
		sharedUsers: {type: new GraphQLList(GraphQLInt)},
		sharedCount: {type: GraphQLInt},
		participants: {type: new GraphQLList(GraphQLInt)},
		participantCount: {type: GraphQLInt},
		number: {type: GraphQLInt},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}

	}
});

export default activityType;
