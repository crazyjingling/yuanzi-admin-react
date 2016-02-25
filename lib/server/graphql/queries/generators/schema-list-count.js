import authorize from '../../authorize';
import countType from '../../types/count';
import SchemaEntryModel from '../../../models/schema-entry';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default (type, schema) => {
  return {
    type: countType,
    args: {
		...paginationQueryArgs
	},
    async resolve (root, params, options) {
      authorize(root);

      const Model = SchemaEntryModel(schema);

      const count = await Model.count(searchQuery({}, params)).exec();
      return {count};
    }
  };

};
