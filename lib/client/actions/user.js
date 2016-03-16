import {pushState} from 'redux-router';
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function changeUserEntryValue (id, value) {
	return {
		type: actionTypes.changeUserEntryValue,
		id,
		value
	};
}

export function addUser (fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.addUser,
			query: `
        mutation addUser ($data: UserInput!) {
          addUser (data: $data) {
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
