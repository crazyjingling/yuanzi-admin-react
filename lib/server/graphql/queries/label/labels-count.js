import Q from 'q';

import authorize from '../../authorize';
import countType from '../../types/count';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import {LabelModel} from '../../../models';

export default {
  type: countType,
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);
    return Q()
    .then(() => LabelModel.count(searchQuery({}, params)))
    .then((count) => {
      return {count};
    });
  }
};
