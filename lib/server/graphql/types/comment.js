import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import strategyType from './strategy';
import photoType from './photo';
import labelType from './label';
import {UserModel, StrategyModel, PhotoModel} from '../../models';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      type: {GraphQLString},
	  strategy: {
		  type: strategyType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.strategy && await StrategyModel.findById(schemaEntry.strategy).exec();
		  }
	  },
	  photo: {
	 	  type: photoType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.photo && await PhotoModel.findById(schemaEntry.photo).exec();
          }
      },
	  content: {GraphQLString},
      owner: {
        type: userType,
        async resolve (schemaEntry, params, options) {
          return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
        }
      },
      targetUser: {
		  type: userType,
		  async resolve (schemaEntry, params, options) {
			return schemaEntry.targetUser && await UserModel.findById(schemaEntry.targetUser).exec();
		  }
	  },
	  commentUser: {
      		  type: userType,
      		  async resolve (schemaEntry, params, options) {
      			return schemaEntry.commentUser && await UserModel.findById(schemaEntry.commentUser).exec();
      		  }
      	  },
      event: {type: GraphQLInt}, //todo: 活动model
      imagesCount: {type: GraphQLInt},
      images: {type: new GraphQLList(GraphQLString)},
	  praiseCount: {type: GraphQLInt},
	  reportCount: {type: GraphQLInt},
      updatedAt: {type: GraphQLString},
      createdAt: {type: GraphQLString}

  }
});

export default commentType;
