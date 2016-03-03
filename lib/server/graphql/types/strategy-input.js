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
import commentReportInputType from './comment-report-input';
import count from './count';
import {UserModel, LabelModel, CommentModel, PhotoModel} from '../../models';
import pluck from 'lodash.pluck';
import groupBy from 'lodash.groupBy';
import sumby from 'lodash.sumby';
import countBy from 'lodash.countby';
const strategyInputType = new GraphQLInputObjectType({
	name: 'StrategyInput',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		title: {type: new GraphQLNonNull(GraphQLString)},
		cover: {type: GraphQLString},
		owner: {
			type: userInputType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		labels: {
			type: new GraphQLList(labelInputType),
			async resolve (schemaEntry, params, options) {
				return schemaEntry.labels.length && await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec();
			}
		},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'isRecommendedInputType',
				fields: {
					stateType: {
						type: GraphQLString
					},
					recommendAt: {
						type: GraphQLString
					}
				}
			})},
		strategyNo: {type: GraphQLString},
		artificialCount: {type: GraphQLInt},
		artificialdata: {
			type: new GraphQLInputObjectType({
				name: 'artificialdataInputType',
				fields: {
					artificialtrycount: {
						type: GraphQLInt
					}
				}
			})
		},
		playCount: {type: GraphQLInt},
		sharedCount: {type: GraphQLInt},
		collectCount: {type: GraphQLInt},
		commentCount: {
			type: GraphQLInt,
			async resolve (schemaEntry, params, options) {
				return await CommentModel.count({strategy: schemaEntry._id}).exec();
			}
		},
		commentReportRelated: {
			type: new GraphQLInputObjectType({
				name: 'commentReportInputType',
				fields: {
					commentReportCount: {
						type: GraphQLInt,
						resolve: (commentReportRelated, params, options) => commentReportRelated.length
					},
					commentReportInfo: {
						type: new GraphQLList(commentReportInputType),
						async resolve (commentReportRelated, params, options) {
							return commentReportRelated;
						}
					}
				}
			}),
			async resolve (schemaEntry, params, options) {
				return await CommentModel.find({strategy: schemaEntry._id, reportUsers: {'$not':{'$size': 0}}}).exec();
			}
		},
		photoCount: {type: GraphQLInt},
		photoReportRelated: {
			type: new GraphQLInputObjectType({
				name: 'photoReportInputType',
				fields: {
					photoReportCount: {
						type: GraphQLInt,
						resolve: (commentReportRelated, params, options) => commentReportRelated.length
					},
					photoReportInfo: {
						type: new GraphQLInputObjectType({
							name: 'photoReportInfoInput',
							fields: {
								'reason1': {type: GraphQLInt, resolve: (commentReportInfo, params, options) => commentReportInfo['广告']||0},
								'reason2': {type: GraphQLInt, resolve: (commentReportInfo, params, options) => commentReportInfo['侵权']||0},
								'reason3': {type: GraphQLInt, resolve: (commentReportInfo, params, options) => commentReportInfo['欺诈']||0},
								'reason4': {type: GraphQLInt, resolve: (commentReportInfo, params, options) => commentReportInfo['色情']||0},
								'reason5': {type: GraphQLInt, resolve: (commentReportInfo, params, options) => commentReportInfo['侮辱诋毁']||0}
							}
						}),
						async resolve (commentReportRelated, params, options) {
							return countBy(commentReportRelated, function (item) {
								return item.reason;
							});
						}
					}
				}
			}),
			async resolve (schemaEntry, params, options) {
				let results = [];
				pluck(await PhotoModel.find({strategy: schemaEntry._id, reportUsers: {'$not':{'$size': 0}}}).exec(), 'reportUsers').forEach(function (item) {
					results = results.concat(item);
				});
				return results;
			}
		},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}

	}
});

export default strategyInputType;
