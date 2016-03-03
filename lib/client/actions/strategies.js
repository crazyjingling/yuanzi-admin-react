import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeStrategy (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeStrategy,
      query: `
        mutation removeStrategy ($data: String!) {
          removeStrategy (data: $data) {
            ${fragmentToQL(fragments.strategy)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

//export function addStrategy (fragments, data) {
//  return (dispatch) => (
//    request({
//      dispatch,
//      type: actionTypes.addStrategy,
//      query: `
//        mutation addStrategy ($data: StrategyInput!) {
//          addStrategy (data: $data) {
//            ${fragmentToQL(fragments.strategy)}
//          }
//        }
//      `,
//      variables: {
//        data
//      }
//    })
//  );
//}
export function updateStrategy (fragments, data) {
	return (dispatch) => (
		request({
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
		})
	);
}
export function recommendStrategy (fragments, data, recommendAt) {
	if(data.isRecommended.stateType === '未推荐'){
		data.isRecommended.stateType = 'done';
		data.isRecommended.recommendAt = recommendAt;

	}else{
		data.isRecommended.stateType = 'undone';

	}
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.recommendStrategy,
			query: `
        mutation recommendStrategy ($data: StrategyInput!) {
          recommendStrategy (data: $data) {
            ${fragmentToQL(fragments.strategy)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
