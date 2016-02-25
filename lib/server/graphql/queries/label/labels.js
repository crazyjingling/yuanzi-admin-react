import {
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import labelType from '../../types/label';
import {LabelModel} from '../../../models';


export default {
  type: new GraphQLList(labelType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const query = LabelModel.find(searchQuery({}, params));
    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
