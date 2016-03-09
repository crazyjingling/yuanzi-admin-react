import {
  GraphQLList,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import {UserModel} from '../../../models';
const ownerPickerType = new GraphQLObjectType({
	name: 'OwnerPickerType',
	fields: {
		_id: {type: GraphQLString},
		nickname: {type: GraphQLString}
	}
});

export default {
  type: new GraphQLList(ownerPickerType),
  args: {
    ...paginationQueryArgs
  },
	resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    return UserModel.find(searchQuery({}, params)).sort({
		createdAt: 'desc'
	}).select(projection).exec();

  }
};
