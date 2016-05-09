/**
 * Created by matonghe on 16/5/9.
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
const commentInputType = new GraphQLInputObjectType({
	name: 'commentInput',
	fields: {
		_id: {type: GraphQLString},
		commentUser: {
			type: userInputType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		createdAt: {type: GraphQLString}
	}
});

export default commentInputType;
