import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

const labelInputType = new GraphQLInputObjectType({
  name: 'LabelInputType',
  fields: {
    _id: {type: GraphQLString},
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

export default labelInputType;
