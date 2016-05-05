/**
 * Created by matonghe on 16/5/5.
 */
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

export function recommendOrder(fragments, data, recommendAt) {
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
			type: actionTypes.recommendOrder,
			query: `
        mutation recommendOrder ($recommendData: RecommendOrderInput!) {
          recommendOrder (data: $recommendData) {
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
export function changeOrderValue (id, value) {
	return {
		type: actionTypes.changeOrderValue,
		id,
		value
	};
}

export function updateOrder(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateOrder,
			query: `
        mutation updateOrder ($data: ActivityInput!) {
          updateOrder (data: $data) {
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
export function addActivity (fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.addActivity,
			query: `
        mutation addActivity ($data: ActivityInput!) {
          addActivity (data: $data) {
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
