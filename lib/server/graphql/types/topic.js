import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import labelType from './label';
import strategyType from './strategy';
import strategySearchType from './strategy-search';
import count from './count';
import {UserModel, LabelModel,MediaModel,StrategyModel} from '../../models';
import Utils from '../../../helpers/utils';

const topicType = new GraphQLObjectType({
  name: 'Topic',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      title: {type: GraphQLString},
	  subTitle: {type: GraphQLString},
	  cover: {
		  type: new GraphQLObjectType({
			  name: 'coverTopicType',
			  fields: {
				  _id: {
					  type: GraphQLString,
					  resolve: (media, params, options) => media._id || ''

				  },
				  ossUrl: {
					  type: GraphQLString,
					  resolve: (media, params, options) => media.ossUrl || ''

				  }
			  }
		  }),
		  async resolve (schemaEntry, params, options) {
			  const media = await MediaModel.findOne({ossUrl: schemaEntry.cover}).select({_id: 1, ossUrl: 1}).exec();
			  return {_id: media ? media._id : '', ossUrl: schemaEntry.cover};
		  }
	  },
	  owner: {
		  type: userType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
		  }
	  },
	  labels: {
		  type: new GraphQLList(labelType),
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.labels.length ? (await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec()) : [];
		  }
	  },
	  isRecommended: {
		  type: new GraphQLObjectType({
			  name: 'isRecommendedTopicType',
			  fields: {
				  stateType: {
					  type: GraphQLString
				  },
				  recommendAt: {
					  type: GraphQLString
				  }
			  }
		  })},
	  viewUsers: {type: new GraphQLList(GraphQLString)},
	  viewCount: {type: GraphQLInt},
	  sharedUsers: {type: new GraphQLList(GraphQLString)},
	  sharedCount: {type: GraphQLInt},
	  cards: {type: new GraphQLList(GraphQLString)},
	  strategies: {
		  type: new GraphQLList(strategySearchType),
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.strategies.length ? (await StrategyModel.find({_id: {'$in' : schemaEntry.strategies}}).exec()) : [];
		  }
	  },
	  strategiesCount: {type: GraphQLInt},
	  artificialCount: {type: GraphQLInt},
      updatedAt: {type: GraphQLString},
      createdAt: {type: GraphQLString}

  }
});

export default topicType;
