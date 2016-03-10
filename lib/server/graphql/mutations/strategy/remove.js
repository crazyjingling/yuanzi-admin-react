import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import config from '../../../../../config';
import strategyType from '../../types/strategy';
import {StrategyModel} from '../../../models';

export default {
  type: strategyType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    return StrategyModel
      .findByIdAndUpdate(params.data,{'isRecommended.stateType': 'rejected'},{upsert: true, new: true})
      .exec()
      .then((removedStrategy) => {
        if (!removedStrategy) {
          throw new Error('strategy not found');
        }
        return removedStrategy;
      });
  }
};
