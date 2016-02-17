import Q from 'q';

import authorize from '../../authorize';
import countType from '../../types/count';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import StrategyModel from '../../../models/strategy';

export default {
  type: countType,
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);
    console.log('=================================countparams', params);
    return Q()
    .then(() => StrategyModel.count(searchQuery({}, params)))
    .then((count) => {
      return {count};
    });
  }
};
