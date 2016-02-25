import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const strategyInputType = new GraphQLInputObjectType({
  name: 'StrategyInput',
  fields: {
    _id: {type: GraphQLString},
    title: {type: new GraphQLNonNull(GraphQLString)},
    cover: {type: GraphQLString},
    owner: {type: GraphQLString},
    labels: {type: GraphQLString},
    isRecommended: {type: GraphQLString},
    strategyNo: {type: GraphQLString},
    artificialdata: {type: GraphQLString},
    playCount: {type: GraphQLString},
    sharedCount: {type: GraphQLString},
    collectCount: {type: GraphQLString},
    comments: {type: GraphQLString},
    photoCount: {type: GraphQLString},
    photoReport: {type: GraphQLString},
    words: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    createdAt: {type: GraphQLString}

  }
});

export default strategyInputType;
