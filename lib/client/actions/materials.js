import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeMaterial(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removeMaterial,
			query: `
        mutation removeMaterial ($data: String!) {
          removeMaterial (data: $data) {
            ${fragmentToQL(fragments.material)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}

//export function addMaterial (fragments, data) {
//  return (dispatch) => (
//    request({
//      dispatch,
//      type: actionTypes.addMaterial,
//      query: `
//        mutation addMaterial ($data: MaterialInput!) {
//          addMaterial (data: $data) {
//            ${fragmentToQL(fragments.material)}
//          }
//        }
//      `,
//      variables: {
//        data
//      }
//    })
//  );
//}
export function updateMaterial(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateMaterial,
			query: `
        mutation updateMaterial ($data: MaterialInput!) {
          updateMaterial (data: $data) {
            ${fragmentToQL(fragments.material)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
export function recommendMaterial(fragments, data, recommendAt) {
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
			type: actionTypes.recommendMaterial,
			query: `
        mutation recommendMaterial ($recommendData: RecommendMaterialInput!) {
          recommendMaterial (data: $recommendData) {
            ${fragmentToQL(fragments.material)}
          }
        }
      `,
			variables: {
				recommendData
			}
		})
	);
}
