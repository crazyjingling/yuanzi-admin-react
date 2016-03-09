import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString
} from 'graphql';

const sessionType = new GraphQLObjectType({
	name: 'Session',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		nickname: {type: new GraphQLNonNull(GraphQLString)},
		account: {
			type: new GraphQLObjectType({
				name: 'sessionAccountType',
				fields: {
					username: {
						type: GraphQLString
					}
				}
			})
		}
	}
});

export default sessionType;
