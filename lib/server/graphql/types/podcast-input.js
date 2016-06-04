/**
 * Created by matonghe on 16/5/30.
 */
import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList
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
		_id: {type: GraphQLString},
		owner: {
			type: new GraphQLInputObjectType({
				name: 'ownerPodcastInputType',
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
		presenter: {type: GraphQLString},
		lecturer: {type: GraphQLString},
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
		//endDate: {type: GraphQLString},
		isBanner: {type: GraphQLBoolean},
		cover: {type: new GraphQLInputObjectType({
			name: 'coverPodcastInputCover',
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
			name: 'BannerPodcastInputCover',
			fields: {
				_id: {
					type: GraphQLString
				},
				ossUrl: {
					type: GraphQLString
				}
			}
		})},
		lecturerAvatar: {type: new GraphQLInputObjectType({
			name: 'tupianPodcastInputCover',
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
