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
import labelType from './label';
import {UserModel, StrategyModel} from '../../models';

const workType = new GraphQLObjectType({
  name: 'Work',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
	  strategy: {
		  type: strategyType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.strategy && await StrategyModel.findById(schemaEntry.strategy).exec();
		  }
	  },
	  content: {
		  type: new GraphQLList(new GraphQLObjectType({
		  name: 'contentWorkType',
		  fields: {
			  img: {
				  type: GraphQLString
			  },
			  desc: {
				  type: GraphQLString
			  }
		  }
		  }))
	  },
      owner: {
        type: userType,
        async resolve (schemaEntry, params, options) {
          return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
        }
      },
	  isDel: {type: GraphQLBoolean},
	  praiseCount: {type: GraphQLInt},
	  sharedCount: {type: GraphQLInt},
	  reportCount: {type: GraphQLInt},
      updatedAt: {type: GraphQLString},
      createdAt: {type: GraphQLString}

  }
});

export default workType;
