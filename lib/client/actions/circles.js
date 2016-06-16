/**
 * Created by matonghe on 16/6/16.
 */
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';
export function changeCircleValue (id, value) {
	return {
		type: actionTypes.changeCircleValue,
		id,
		value
	};
}
export function removeCircle(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removeCircle,
			query: `
        mutation removeCircle ($data: String!) {
          removeCircle (data: $data) {
            ${fragmentToQL(fragments.circle)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}

export function updateCircle(fragments, data) {
	if (data.isRecommended.stateType === '已上线') {
		data.isRecommended.stateType = 'publish';
	} else {
		data.isRecommended.stateType = 'draft';
	}
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateCircle,
			query: `
        mutation updateCircle ($data: CircleInput!) {
          updateCircle (data: $data) {
            ${fragmentToQL(fragments.circle)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
export function recommendCircle(fragments, data, recommendAt) {
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
			type: actionTypes.recommendCircle,
			query: `
        mutation recommendCircle ($recommendData: RecommendCircleInput!) {
          recommendCircle (data: $recommendData) {
            ${fragmentToQL(fragments.circle)}
          }
        }
      `,
			variables: {
				recommendData
			}
		})
	);
}
export function addCircle (fragments, data) {
	console.log(fragments, data);
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.addCircle,
			query: `
			mutation addCircle ($data: CircleInput!) {
			  addCircle (data: $data) {
				${fragmentToQL(fragments.circle)}
			  }
			}
		  `,
			variables: {
				data
			}
		})
	);
}
