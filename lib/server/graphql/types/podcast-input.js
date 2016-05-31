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

const podcastInputType = new GraphQLInputObjectType({
	name: 'PodcastInput',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		lecturer: {
			type: new GraphQLInputObjectType({
				name: 'lecturerInputType',
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
		lecturerIntroduction: {type: GraphQLString},
		title: {type: GraphQLString},
		price: {type: GraphQLInt},
		priceType: {type: GraphQLString},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'recommendedPodcastInputType',
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
		cover: {type: new GraphQLInputObjectType({
			name: 'coverPodcastCover',
			fields: {
				_id: {
					type: GraphQLString
				},
				ossUrl: {
					type: GraphQLString
				}
			}
		})},
		bannerImg: {type: new GraphQLInputObjectType({
			name: 'BannerPodcastCover',
			fields: {
				_id: {
					type: GraphQLString
				},
				ossUrl: {
					type: GraphQLString
				}
			}
		})},
		tupian: {type: new GraphQLInputObjectType({
			name: 'tupianPodcastCover',
			fields: {
				_id: {
					type: GraphQLString
				},
				ossUrl: {
					type: GraphQLString
				}
			}
		})},
		enrollCount: {type: GraphQLInt},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString},
		content: {type: GraphQLString},
		sharedCount: {type: GraphQLInt},
		commentCount: {
			type: GraphQLInt
		},
		commentReportRelated: {
			type: new GraphQLInputObjectType({
				name: 'commentReportPodcastInputType',
				fields: {
					commentReportCount: {
						type: GraphQLInt
					},
					commentReportInfo: {
						type: GraphQLString
					}
				}
			})
		}
	}
});

export default podcastInputType;
