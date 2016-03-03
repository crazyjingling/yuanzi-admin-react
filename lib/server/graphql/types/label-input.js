import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

const labelInputType = new GraphQLInputObjectType({
  name: 'LabelInput',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
	  cover: {type: GraphQLString},
	  type: {type: GraphQLString},
    ownedType: {type: new GraphQLInputObjectType({
		name: 'ownedTypeInput',
		fields: {
			_id: {type: GraphQLString},
			title: {type: GraphQLString}
		}
	})},
	  display: {type: GraphQLString},
	  color: {type: GraphQLString},
	  searchNum: {type: GraphQLString},
	  createdAt: {type: GraphQLString},
	  updatedAt: {type: GraphQLString}
  }
});

export default labelInputType;
