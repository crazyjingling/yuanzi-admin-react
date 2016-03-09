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
/**
 * 坑爹的,不是正式发布的果然不靠谱
 important: searchQuery 此方法内不能使用console.log打印输出,否则搜索结果会报错

 { data:
   { session:
      { _id: '56c55216cebc7f55067da2fb',
        username: 'demo',
        name: 'demo',
        email: '1321812120@qq.com' },
     tabs: [],
     labelsCount: null,
     labels: null },
  errors:
   [ { [Error: Unexpected token u]
       message: 'Unexpected token u',
       originalError: [SyntaxError: Unexpected token u]
     },
     { [Error: Unexpected token u]
       message: 'Unexpected token u',
       originalError: [SyntaxError: Unexpected token u]
     }
   ]
 }
 */
export function searchQuery (find, params) {
  const and = [];
  if (params.search) {
    forEach(JSON.parse(params.search), (item, key) => {
      if(item.type !== 'text'){
        if(item.value && item.value !== 'all'){
          if(typeof item.value === 'boolean'){
            and.push({
              [key]: item.value === '1' ? true : { '$ne': true}
            });
          }
          and.push({
            [key]: item.value
          });
        }

      }else{
        if(item.value.trim()){
          and.push({
            [key]: new RegExp('.*' + item.value.trim(), 'i')
          });
        }
      }

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
