import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';

const strategySearchType = new GraphQLObjectType({
	name: 'StrategySearchType',
	fields: {
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
		cover: {type: GraphQLString}
	}
});
export default strategySearchType;
