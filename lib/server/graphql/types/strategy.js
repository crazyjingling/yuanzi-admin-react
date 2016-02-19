import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
    GraphQLList
} from 'graphql';
import userType from './user';
import labelType from './label';
import {UserModel, LabelModel} from '../../models';

const strategyType = new GraphQLObjectType({
  name: 'Strategy',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
      cover: {type: GraphQLString},
      owner: {
        type: userType,
        async resolve (schemaEntry, params, options) {
          return await UserModel.findById(schemaEntry.owner).exec();
        }
      },
      labels: {
        type: new GraphQLList(labelType),
        async resolve (schemaEntry, params, options) {
          return await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec();
        }
      },
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
