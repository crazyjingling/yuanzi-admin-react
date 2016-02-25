import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
GraphQLBoolean
} from 'graphql';

const labelType = new GraphQLObjectType({
  name: 'Label',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    type: {type: GraphQLString},
    cover: {type: GraphQLString},
    display: {
		type: GraphQLString,
		resolve: (result) => result.display ? '显示' : '不显示'
	},
    color: {type: GraphQLString},
    searchNum: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString}
  }
});

export default labelType;
