/**
 * Created by matonghe on 16/5/5.
 */
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeComment(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removeComment,
			query: `
        mutation removeComment ($data: String!) {
          removeComment (data: $data) {
            ${fragmentToQL(fragments.comment)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}


export function changeCommentValue (id, value) {
	return {
		type: actionTypes.changeCommentValue,
		id,
		value
	};
}

export function updateComment(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateComment,
			query: `
        mutation updateComment ($data: CommentInput!) {
          updateComment (data: $data) {
            ${fragmentToQL(fragments.comment)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}

