import {pushState} from 'redux-router';
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function changeStrategyToDefault (id, value) {
	return {
		type: actionTypes.changeStrategyToDefault
	};
}
export function changeStrategyValue (id, value) {
	return {
		type: actionTypes.changeStrategyValue,
		id,
		value
	};
}
export function addStrategy (fragments, data, redirect = false) {
	return (dispatch) => {
		return request({
			dispatch,
			type: actionTypes.addStrategy,
			query: `
        mutation addStrategy ($data: StrategyInput!) {
          addStrategy (data: $data) {
            ${fragmentToQL(fragments.strategy)}
          }
        }
      `,
			variables: {
				data
			}
		})
	};
}


export function updateStrategy (fragments, data) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.updateStrategy,
      query: `
        mutation updateStrategy ($data: StrategyInput!) {
          updateStrategy (data: $data) {
            ${fragmentToQL(fragments.strategy)}
          }
        }
      `,
      variables: {
        data
      }
    });
  };
}

