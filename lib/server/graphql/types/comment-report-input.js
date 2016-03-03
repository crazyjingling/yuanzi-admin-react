import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';

const commentReportType = new GraphQLInputObjectType({
  name: 'CommentReportInput',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      type: {type: GraphQLString},
	  content: {type:GraphQLString},
	  reportCount: {type: GraphQLInt}
  }
});

export default commentReportType;
