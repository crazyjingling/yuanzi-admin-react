import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import activityType from './activity';
import contactType from './contact';
import count from './count';
import {UserModel, CommentModel, ActivityModel, ContactModel} from '../../models';
import Utils from '../../../helpers/utils';

const orderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
	  owner: {
		  type: userType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
		  }
	  },
	  event: {
		  type: activityType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.event && await ActivityModel.findById(schemaEntry.event).exec();
		  }
	  },
	  contact: {
		  type: contactType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.contact && await ContactModel.findById(schemaEntry.contact).exec();
		  }
	  },
	  orderCode: {type: GraphQLInt},
	  orderStatus: {type: GraphQLString},
	  payment: {type: GraphQLInt},
	  createdAt: {type: GraphQLString}

  }
});

export default orderType;
