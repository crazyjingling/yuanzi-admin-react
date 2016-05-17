/**
 * Created by matonghe on 16/5/17.
 */

import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeWork(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removeWork,
			query: `
        mutation removeWork ($data: String!) {
          removeWork (data: $data) {
            ${fragmentToQL(fragments.work)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}


export function changeWorkValue (id, value) {
	return {
		type: actionTypes.changeWorkValue,
		id,
		value
	};
}

export function updateWork(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateWork,
			query: `
        mutation updateWork ($data: WorkInput!) {
          updateWork (data: $data) {
            ${fragmentToQL(fragments.work)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
export function addWork (fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.addWork,
			query: `
        mutation addWork ($data: WorkInput!) {
          addWork (data: $data) {
            ${fragmentToQL(fragments.work)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
