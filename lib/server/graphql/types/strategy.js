import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import userType from './user';
import UserModel from '../../models/user';

const strategyType = new GraphQLObjectType({
  name: 'Strategy',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
      cover: {type: GraphQLString},
      owner: {
        type: userType,
        async resolve (schemaEntry, params, options) {
          console.log('=================================schemaEntry, params, options', schemaEntry.owner);
          return await UserModel.findById(schemaEntry.owner).exec();
        }
      },
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

export default strategyType;
