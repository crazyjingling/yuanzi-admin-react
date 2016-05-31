/**
 * Created by matonghe on 16/5/30.
 */
/**
 * Created by matonghe on 16/5/5.
 */
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removePodcast(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removePodcast,
			query: `
        mutation removePodcast ($data: String!) {
          removePodcast (data: $data) {
            ${fragmentToQL(fragments.podcast)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}

export function recommendPodcast(fragments, data, recommendAt) {
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
			type: actionTypes.recommendPodcast,
			query: `
        mutation recommendPodcast ($recommendData: recommendedPodcastInputType!) {
          recommendPodcast (data: $recommendData) {
            ${fragmentToQL(fragments.podcast)}
          }
        }
      `,
			variables: {
				recommendData
			}
		})
	);
}
export function changePodcastValue (id, value) {
	return {
		type: actionTypes.changePodcastValue,
		id,
		value
	};
}

export function updatePodcast(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updatePodcast,
			query: `
        mutation updatePodcast ($data: PodcastInput!) {
          updatePodcast (data: $data) {
            ${fragmentToQL(fragments.podcast)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
export function addPodcast (fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.addPodcast,
			query: `
        mutation addPodcast ($data: PodcastInput!) {
          addPodcast (data: $data) {
            ${fragmentToQL(fragments.podcast)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
