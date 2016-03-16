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
const materialInputType = new GraphQLInputObjectType({
	name: 'MaterialInput',
	fields: {
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
		type: {type: GraphQLString},
		url: {type: GraphQLString},
		ossUrl: {type: GraphQLString},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}
	}
});

export default materialInputType;
