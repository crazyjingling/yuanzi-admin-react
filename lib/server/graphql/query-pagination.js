import forEach from 'lodash.foreach';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
GraphQLInputObjectType
} from 'graphql';

import filterType from './types/filter';

export const paginationQueryArgs = {
  sort: {
    name: 'sort',
    type: GraphQLString
  },
  order: {
    name: 'order',
    type: GraphQLString
  },
  limit: {
    name: 'limit',
    type: GraphQLInt
  },
  filters: {
    name: 'filters',
    type: new GraphQLList(filterType)
  },
  page: {
    name: 'page',
    type: GraphQLInt
  },
  search: {
    name: 'search',
    type: GraphQLString
  },
  s: {
    name: 's',
    type: GraphQLString
  }
};

function parseFilterOperation (op) {
  const result = {};
  forEach(op, (value, key) => {
    result['$' + key] = value;
  });
  return result;
}

export function searchQuery (find, params) {
  const and = [];
  console.log('=================================params.search', JSON.parse(params.search));
  if (params.search) {
    forEach(JSON.parse(params.search), (item, key) => {
      console.log('=================================item', item);
      if(item.type !== 'text'){
        console.log('=================================1', 1);
        if(item.value && item.value !== 'all'){
          and.push({
            [key]: item.value === '1' ? true : { '$ne': true}
          });
        }

      }else{
        console.log('=================================2', 2);
        and.push({
          [key]: new RegExp('.*' + item.value, 'i')
        });
      }

    });
  }

  console.log('=================================and', and);
  // Filters
  if (params.filters && params.filters.constructor === Array) {
    forEach(params.filters, (filter) => {
      and.push({
        [filter.property]: parseFilterOperation(filter.op)
      });
    });
  }

  // apply and operator with all the filters
  if (and.length > 0) {
    find.$and = and;
  }
  return find;
}

export function paginateQuery (query, params) {
  if (params.sort) {
    query.sort({
      [params.sort]: params.order || 'asc'
    });
  }
  if (params.page && params.limit) {
    query.skip((params.page - 1) * params.limit);
  }
  if (params.limit) {
    query.limit(params.limit);
  }
}
