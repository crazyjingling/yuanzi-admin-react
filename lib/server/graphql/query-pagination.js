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
  if (params.search) {
    forEach(JSON.parse(params.search), (value,key) => {

      and.push({
        [key]:  new RegExp('.*' + value, 'i')
      });
    });
  }

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
