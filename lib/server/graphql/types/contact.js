/**
 * Created by matonghe on 16/5/5.
 */
import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import {ContactModel, UserModel} from '../../models';

const contactType = new GraphQLObjectType({
	name: 'Contact',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		owner: {
			type: userType,
			async resolve (schemaEntry, params, options) {
				const owner = await UserModel.findOne({labels: schemaEntry._id}).exec();
				return owner;
			}
		},
		phone: {type: GraphQLString},
		createdAt: {type: GraphQLString},
	}
});

export default contactType;
