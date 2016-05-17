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
import count from './count';
import {UserModel, LabelModel, CommentModel, WorkModel} from '../../models';
import Utils from '../../../helpers/utils';

const feedbackType = new GraphQLObjectType({
  name: 'Feedback',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
	  user: {
		  type: userType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.user && await UserModel.findById(schemaEntry.user).exec();
		  }
	  },
	  deviceInfo: {
		  type: new GraphQLObjectType({
			  name: 'deviceInfoType',
			  fields: {
				  deviceType: {
					  type: GraphQLString
				  },
				  deviceVersion: {
					  type: GraphQLString
				  },
				  systemVersion: {
					  type: GraphQLString
				  }
			  }
		  })},
	  images: {type: new GraphQLList(GraphQLString)},
	  imagesCount: {type: GraphQLInt},
	  desc: {type: GraphQLString},
	  contactInfo: {type: GraphQLString},
      createdAt: {type: GraphQLString}
  }
});

export default feedbackType;
