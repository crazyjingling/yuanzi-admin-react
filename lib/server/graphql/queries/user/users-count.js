import Q from 'q';

import authorize from '../../authorize';
import countType from '../../types/count';
import UserModel from '../../../models/user';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: countType,
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);

    return Q()
    .then(() => UserModel.count(searchQuery({}, params)))
    .then((count) => {
      return {count};
    });
  }
};
