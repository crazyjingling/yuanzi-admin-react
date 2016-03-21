import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeStrategy(fragments, data) {
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

export function updateStrategy(fragments, data) {
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
export function recommendStrategy(fragments, data, recommendAt) {
	//这里直接改data的值会优先反应到界面上,所以用其他的变量来代替
	let recommendData = {
		_id: data._id
	};
	if (data.isRecommended.stateType === '未上线') {
		recommendData.isRecommended = {
			stateType: 'done',
			recommendAt: recommendAt
		};

	} else {
		recommendData.isRecommended ={
			stateType: 'undone',
			recommendAt: data.isRecommended.recommendAt
		};

	}
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.recommendStrategy,
			query: `
        mutation recommendStrategy ($recommendData: RecommendStrategyInput!) {
          recommendStrategy (data: $recommendData) {
            ${fragmentToQL(fragments.strategy)}
          }
        }
      `,
			variables: {
				recommendData
			}
		})
	);
}
