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
import commentReportType from './comment-report';
import count from './count';
import {UserModel, LabelModel, CommentModel, WorkModel, MediaModel} from '../../models';
import pluck from 'lodash.pluck';
import groupBy from 'lodash.groupby';
import sumby from 'lodash.sumby';
import countBy from 'lodash.countby';
import Utils from '../../../helpers/utils';

const strategyType = new GraphQLObjectType({
	name: 'Strategy',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		title: {type: new GraphQLNonNull(GraphQLString)},
		cover: {
			type: new GraphQLObjectType({
				name: 'coverStrategyType',
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
			}
		},
		content: {type: GraphQLString},
		description: {type: GraphQLString},
		subTitle: {type: GraphQLString},
		soundStoryLength: {type: GraphQLString},
		soundStory: {type: GraphQLString},
		consumingTime: {type: GraphQLInt},
		degree: {type: GraphQLInt},
		steps: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'stepsStrategyType',
				fields: {
					imgUrl: {
						type: new GraphQLObjectType({
							name: 'stepsImgUrlType',
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
							const media = await MediaModel.findOne({ossUrl: schemaEntry.imgUrl}).select({_id: 1, ossUrl: 1}).exec();
							return {_id: media ? media._id : '', ossUrl: schemaEntry.imgUrl};
						}
					},
					description: {
						type: GraphQLString
					}
				}
			}))
		},
		scope: {
			type: GraphQLString,
			resolve (schemaEntry, params, options) {
				switch (schemaEntry.scope){
					case 0:
					case 1:
						return "1~2岁";
					case 2:
						return "3~4岁";
					case 3:
						return "5岁以上";
					default:
						return "1~2岁";
						break;
				}
			}
		},
		materials: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'materialsStrategyType',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					},
					amount: {
						type: GraphQLString
					}
				}
			}))
		},
		tools: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'toolsStrategyType',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					},
					amount: {
						type: GraphQLString
					}
				}
			}))
		},
		type: {
			type: GraphQLString,
			resolve (schemaEntry, params, options) {
				console.log('=================================schemaEntry.type', schemaEntry.type);
				return schemaEntry.type ? schemaEntry.type : (schemaEntry.materials.length || schemaEntry.tools.length ? '动手妙招' : '经验妙招');
			}
		},
		owner: {
			type: userType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		labels: {
			type: new GraphQLList(labelType),
			async resolve (schemaEntry, params, options) {
				return schemaEntry.labels.length ? (await LabelModel.find({_id: {'$in': schemaEntry.labels}}).exec()) : [];
			}
		},
		isRecommended: {
			type: new GraphQLObjectType({
				name: 'isRecommendedType',
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
		artificialCount: {type: GraphQLInt},
		artificialdata: {
			type: new GraphQLObjectType({
				name: 'artificialdataType',
				fields: {
					artificialtrycount: {
						type: GraphQLInt
					}
				}
			})
		},
		playCount: {
			type: GraphQLInt,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.playCount - schemaEntry.artificialCount;
			}
		},
		sharedCount: {type: GraphQLInt},
		collectCount: {type: GraphQLInt},
		reportUsers: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'reportUsers',
				fields: {
					user: {type: GraphQLString},
					reason: {type: GraphQLString}
				}
			}))
		},
		reportRelated: {
			type: new GraphQLObjectType({
				name: 'ReportType',
				fields: {
					reportCount: {
						type: GraphQLInt,
						resolve: (reportRelated, params, options) => reportRelated.reportCount
					},
					reportInfo: {
						type: GraphQLString,
						resolve: (reportRelated, params, options) => JSON.stringify({reportReasonCount: Utils.resolveReportReason(reportRelated.reportUsers)})
					}
				}
			}),
			resolve: (schemaEntry, params, options) => schemaEntry
		},
		commentCount: {
			type: GraphQLInt,
			async resolve (schemaEntry, params, options) {
				return await CommentModel.count({strategy: schemaEntry._id}).exec();
			}
		},
		commentReportRelated: {
			type: new GraphQLObjectType({
				name: 'commentReportType',
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
				return await CommentModel.find({strategy: schemaEntry._id, reportUsers: {'$not': {'$size': 0}}})
					.select({
						_id: 1,
						content: 1,
						reportUsers: 1
					})
					.exec();
			}
		},
		photoCount: {type: GraphQLInt},
		photoReportRelated: {
			type: new GraphQLObjectType({
				name: 'photoReportType',
				fields: {
					photoReportCount: {
						type: GraphQLInt,
						resolve: (photoReportRelated, params, options) => {
							let results = [];
							pluck(photoReportRelated, 'reportUsers').forEach(function (item) {
								results = results.concat(item);
							});
							return results.length;
						}
					},
					photoReportInfo: {
						type: GraphQLString,
						//todo: 等 graphql 的 GraphQLRawObjectType 可以用了,就将这个类型替换
						resolve: (photoReportInfo, params, options) => JSON.stringify({photos: photoReportInfo})
					}
				}
			}),
			async resolve (schemaEntry, params, options) {
				return await WorkModel.find({strategy: schemaEntry._id, reportUsers: {'$not': {'$size': 0}}})
					.populate({
						path: 'owner', select: 'nickname avatar'
					})
					.exec()
			}
		},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}

	}
});

export default strategyType;
