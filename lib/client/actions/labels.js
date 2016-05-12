import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';



export function addLabel (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addLabel,
      query: `
        mutation addLabel ($data: LabelInput!) {
          addLabel (data: $data) {
            ${fragmentToQL(fragments.label)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
export function updateLabel (fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateLabel,
			query: `
        mutation updateLabel ($data: LabelInput!) {
          updateLabel (data: $data) {
            ${fragmentToQL(fragments.label)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
export function changeLabelFields (id, value) {
	return {
		type: actionTypes.changeLabelFields,
		id,
		value
	};
}

export function changeLabelToDefault () {
	return {
		type: actionTypes.changeLabelToDefault
	};
}
