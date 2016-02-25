import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeLabel (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeLabel,
      query: `
        mutation removeLabel ($data: String!) {
          removeLabel (data: $data) {
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