import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

const labelType = new GraphQLObjectType({
  name: 'Label',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    type: {type: GraphQLString},
    cover: {type: GraphQLString},
    display: {type: GraphQLString},
    color: {type: GraphQLString},
    searchNum: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString}
  }
});

export default labelType;
