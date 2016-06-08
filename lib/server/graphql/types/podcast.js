/**
 * Created by matonghe on 16/5/30.
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
import labelType from './label';
import count from './count';
import {UserModel, LabelModel, CommentModel,  MediaModel} from '../../models';
import Utils from '../../../helpers/utils';
import pluck from 'lodash.pluck';

const podcastType = new GraphQLObjectType({
	name: 'Podcast',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		owner: {
			type: userType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		lecturerIntroduction: {type: GraphQLString},
		lecturer: {type: GraphQLString},
		presenter: {type: GraphQLString},
		title: {type: GraphQLString},
		price: {type: GraphQLInt},
		priceType: {type: GraphQLString},
		roomNumber: {type: GraphQLString},
		isRecommended: {
			type: new GraphQLObjectType({
				name: 'isRecommendedPodcastType',
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
		startDate: {type: GraphQLString},
		endDate: {type: GraphQLString},
		isBanner: {type: GraphQLBoolean},
		cover: {type: new GraphQLObjectType({
			name: 'coverPodcastCover',
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
		bannerImg: {type: new GraphQLObjectType({
			name: 'BannerPodcastCover',
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
				const media = await MediaModel.findOne({ossUrl: schemaEntry.bannerImg}).select({_id: 1, ossUrl: 1}).exec();
				return {_id: media ? media._id : '', ossUrl: schemaEntry.bannerImg};
			}},
		lecturerAvatar: {type: new GraphQLObjectType({
			name: 'lecturerAvatarPodcastCover',
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
				const media = await MediaModel.findOne({ossUrl: schemaEntry.lecturerAvatar}).select({_id: 1, ossUrl: 1}).exec();
				return {_id: media ? media._id : '', ossUrl: schemaEntry.lecturerAvatar};
			}},
		enrollCount: {type: GraphQLInt},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString},
		content: {type: GraphQLString},
		sharedCount: {type: GraphQLInt},
		commentCount: {
			type: GraphQLInt,
			async resolve (schemaEntry, params, options) {
				return await CommentModel.count({strategy: schemaEntry._id}).exec();
			}
		},
		commentReportRelated: {
			type: new GraphQLObjectType({
				name: 'commentReportPodcastType',
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
			})
		}
	}
});

export default podcastType;
