/**
 * Created by matonghe on 16/5/30.
 */
/**
 * Created by matonghe on 16/5/5.
 */
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removepodcast(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removepodcast,
			query: `
        mutation removepodcast ($data: String!) {
          removepodcast (data: $data) {
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

export function recommendpodcast(fragments, data, recommendAt) {
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
			type: actionTypes.recommendpodcast,
			query: `
        mutation recommendpodcast ($recommendData: RecommendpodcastInput!) {
          recommendpodcast (data: $recommendData) {
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
export function changepodcastValue (id, value) {
	return {
		type: actionTypes.changepodcastValue,
		id,
		value
	};
}

export function updatepodcast(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updatepodcast,
			query: `
        mutation updatepodcast ($data: podcastInput!) {
          updatepodcast (data: $data) {
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
export function addpodcast (fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.addpodcast,
			query: `
        mutation addpodcast ($data: podcastInput!) {
          addpodcast (data: $data) {
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
