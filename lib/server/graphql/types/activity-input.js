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
		owner: {
			type: new GraphQLInputObjectType({
				name: 'ownerActivityInputType',
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
		title: {type: GraphQLString},
		price: {type: GraphQLInt},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'recommendedActivityInputType',
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
		cover: {
			type: new GraphQLInputObjectType({
				name: 'coverActivityInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					ossUrl: {
						type: GraphQLString
					}
				}
			})
		},
		bannerImg: {
			type: new GraphQLInputObjectType({
				name: 'bannerActivityInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					ossUrl: {
						type: GraphQLString
					}
				}
			})
		},
		startDate: {type: GraphQLString},
		endDate: {type: GraphQLString},
		content: {type: GraphQLString},
		location: {type: GraphQLString},
		participants: {type: new GraphQLList(GraphQLString)},
		participantCount: {type: GraphQLInt},
		number: {type: GraphQLInt},
		enrollCount: {type: GraphQLInt}

	}
});

export default activityInputType;
