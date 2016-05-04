import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeActivity(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removeActivity,
			query: `
        mutation removeActivity ($data: String!) {
          removeActivity (data: $data) {
            ${fragmentToQL(fragments.activity)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}


export function recommendActivity(fragments, data, recommendAt) {
	//这里直接改data的值会优先反应到界面上,所以用其他的变量来代替
	let recommendData = {
		_id: data._id
	};
	if (data.isRecommended.stateType === '未上线') {
		recommendData.isRecommended = {
			stateType: 'publish',
			recommendAt: recommendAt
		};

	} else {
		recommendData.isRecommended ={
			stateType: 'draft',
			recommendAt: data.isRecommended.recommendAt
		};

	}
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.recommendActivity,
			query: `
        mutation recommendActivity ($recommendData: RecommendActivityInput!) {
          recommendActivity (data: $recommendData) {
            ${fragmentToQL(fragments.activity)}
          }
        }
      `,
			variables: {
				recommendData
			}
		})
	);
}
