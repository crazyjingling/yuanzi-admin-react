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
const orderInputType = new GraphQLInputObjectType({
	name: 'OrderInput',
	fields: {
		_id: {type: GraphQLString},
		owner: {
			type: userInputType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
		createdAt: {type: GraphQLString}

	}
});

export default orderInputType;
