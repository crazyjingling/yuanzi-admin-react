import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLBoolean
} from 'graphql';
import {LabelModel} from '../../models';

const ownedType = new GraphQLObjectType({
	name: 'OwnedType',
	fields: {
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
		cover: {type: GraphQLString}
	}
});

export default ownedType;
