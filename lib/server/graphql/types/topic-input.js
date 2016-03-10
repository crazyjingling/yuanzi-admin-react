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
import {UserModel, LabelModel} from '../../models';
const topicInputType = new GraphQLInputObjectType({
	name: 'TopicInput',
	fields: {
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
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
				return schemaEntry.labels.length ? (await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec()) : [];
			}
		},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'isRecommendedTopicInputType',
				fields: {
					stateType: {
						type: GraphQLString
					},
					recommendAt: {
						type: GraphQLString
					}
				}
			})},
		viewUsers: {type: new GraphQLList(GraphQLString)},
		viewCount: {type: GraphQLInt},
		sharedUsers: {type: new GraphQLList(GraphQLString)},
		sharedCount: {type: GraphQLInt},
		cards: {type: new GraphQLList(GraphQLString)},
		strategiesCount: {type: GraphQLInt},
		artificialCount: {type: GraphQLInt},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}

	}
});

export default topicInputType;