import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';
export function removeUser (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeUser,
      query: `
        mutation removeUser ($data: String!) {
          removeUser (data: $data) {
            ${fragmentToQL(fragments.user)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}

export function updateUser(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateUser,
			query: `
        mutation updateUser ($data: UserUpdateInputType!) {
          updateUser (data: $data) {
            ${fragmentToQL(fragments.user)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
