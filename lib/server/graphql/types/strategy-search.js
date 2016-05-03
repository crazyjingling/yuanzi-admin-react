import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';

import {UserModel} from '../../models';
const strategySearchType = new GraphQLObjectType({
	name: 'StrategySearchType',
	fields: {
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
		cover: {type: GraphQLString},
		owner: {
			type: userType,
			async resolve (schemaEntry, params, options) {
				return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
			}
		},
	}
});
export default strategySearchType;
