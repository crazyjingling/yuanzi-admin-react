/**
 * Created by matonghe on 16/6/17.
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
const circleInputType = new GraphQLInputObjectType({
	name: 'CircleInput',
	fields: {
		_id: {type: GraphQLString},
		owner: {
			type: new GraphQLInputObjectType({
				name: 'ownerCircleInputType',
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
		name: {type: GraphQLString},
		summary: {type: GraphQLString},
		//isRecommended: {
		//	type: new GraphQLInputObjectType({
		//		name: 'recommendedCircleInputType',
		//		fields: {
		//			stateType: {
		//				type: GraphQLString
		//			},
		//			recommendAt: {
		//				type: GraphQLString
		//			}
		//		}
		//	})
		//},
		cover: {
			type: new GraphQLInputObjectType({
				name: 'coverCircleInputType',
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
		createdAt: {type: GraphQLString},
		updatedAt: {type: GraphQLString}
	}
});

export default circleInputType;
