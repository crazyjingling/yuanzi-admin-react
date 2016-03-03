import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';

const commentReportType = new GraphQLObjectType({
  name: 'CommentReport',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      type: {type: GraphQLString},
	  content: {type:GraphQLString},
	  reportCount: {type: GraphQLInt}
  }
});

export default commentReportType;
