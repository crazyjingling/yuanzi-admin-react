import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeTopic(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removeTopic,
			query: `
        mutation removeTopic ($data: String!) {
          removeTopic (data: $data) {
            ${fragmentToQL(fragments.topic)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}

//export function addTopic (fragments, data) {
//  return (dispatch) => (
//    request({
//      dispatch,
//      type: actionTypes.addTopic,
//      query: `
//        mutation addTopic ($data: TopicInput!) {
//          addTopic (data: $data) {
//            ${fragmentToQL(fragments.topic)}
//          }
//        }
//      `,
//      variables: {
//        data
//      }
//    })
//  );
//}
export function updateTopic(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateTopic,
			query: `
        mutation updateTopic ($data: TopicInput!) {
          updateTopic (data: $data) {
            ${fragmentToQL(fragments.topic)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
export function recommendTopic(fragments, data, recommendAt) {
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
			type: actionTypes.recommendTopic,
			query: `
        mutation recommendTopic ($recommendData: RecommendTopicInput!) {
          recommendTopic (data: $recommendData) {
            ${fragmentToQL(fragments.topic)}
          }
        }
      `,
			variables: {
				recommendData
			}
		})
	);
}
