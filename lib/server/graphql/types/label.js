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
    display: {type: GraphQLBoolean},
    color: {type: GraphQLString},
    searchNum: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString}
  }
});

export default labelType;
