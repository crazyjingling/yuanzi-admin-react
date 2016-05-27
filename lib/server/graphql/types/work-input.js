/**
 * Created by matonghe on 16/5/17.
 */
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
import {UserModel} from '../../models';
const workInputType = new GraphQLInputObjectType({
	name: 'WorkInput',
	fields: {
		_id: {type: GraphQLString},
		owner: {
			type: new GraphQLInputObjectType({
				name: 'ownerWorkInputType',
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
		strategy: {
			type: new GraphQLInputObjectType({
				name: 'strategyWorkInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					}
				}
			})
		},
		isDel: {type: GraphQLBoolean},
		praiseCount: {type: GraphQLInt},
		sharedCount: {type: GraphQLInt},
		reportCount: {type: GraphQLInt},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}

	}
});

export default workInputType;
