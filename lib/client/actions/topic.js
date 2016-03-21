import {pushState} from 'redux-router';
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function changeTopicToDefault (id, value) {
	return {
		type: actionTypes.changeTopicToDefault
	};
}
export function changeTopicValue (id, value) {
	return {
		type: actionTypes.changeTopicValue,
		id,
		value
	};
}
export function addTopic (fragments, data) {
	return (dispatch) => {
		return request({
			dispatch,
			type: actionTypes.addTopic,
			query: `
        mutation addTopic ($data: TopicInput!) {
          addTopic (data: $data) {
            ${fragmentToQL(fragments.topic)}
          }
        }
      `,
			variables: {
				data
			}
		})
	};
}


export function updateTopic (fragments, data) {
	return (dispatch) => {
		return request({
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
		});
	};
}

