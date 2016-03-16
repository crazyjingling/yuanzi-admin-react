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
import {UserModel, LabelModel, CommentModel, PhotoModel} from '../../models';
import Utils from '../../../helpers/utils';
import pluck from 'lodash.pluck';

const materialType = new GraphQLObjectType({
	name: 'Material',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		title: {type: GraphQLString},
		type: {type: GraphQLString},
		url: {type: GraphQLString},
		ossUrl: {type: GraphQLString},
		updatedAt: {type: GraphQLString},
		createdAt: {type: GraphQLString}

	}
});

export default materialType;
