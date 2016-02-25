import {pushState} from 'redux-router';
import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function getLabel (fragments, slug) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getLabel,
      query: `
          query label ($slug: String!) {
            label (slug: $slug) {
              ${fragmentToQL(fragments.label)}
            }
          }
      `,
      variables: {
        slug
      }
    })
  );
}

export function updateLabel (fragments, data) {
  return (dispatch) => {
    return request({
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
    }).then((result) => {
      return result.updateLabel;
    });
  };
}

export function saveLabelFromDraft (fragments, publish = false) {
  return (dispatch, getState) => {
    const draft = getState().draft.data;
    const label = getState().label.data;
    const stringified = JSON.stringify(draft.data);

    const labelInput = Object.assign({}, label, {
      data: stringified,
      state: publish ? 'published' : label.state
    });
    const draftInput = Object.assign({}, draft, {
      data: stringified,
      actions: '[]',
      __v: label.__v + 1
    });

    return request({
      dispatch,
      type: actionTypes.saveLabelFromDraft,
      query: `
        mutation ($data: LabelInput!, $data0: DraftInput!) {
          updateLabel (data: $data) {
            ${fragmentToQL(fragments.label)}
          }
          updateDraft (data: $data0) {
            ${fragmentToQL(fragments.draft)}
          }
        }
      `,
      variables: {
        data: labelInput,
        data0: draftInput
      }
    });
  };
}

export function addLabel (fragments, data, redirect = false) {
  return (dispatch) => {
    return request({
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
    }).then((result) => {
      if (redirect) {
        dispatch(pushState(null, '/admin/label/' + result.addLabel._id));
      }
      return result.addLabel;
    });
  };
}

export function restoreLabel (fragments, labelId, version) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.restoreLabel,
      query: `
        mutation restoreLabel ($labelId: ID!, $version: Int!) {
          restoreLabel (labelId: $labelId, version: $version) {
            ${fragmentToQL(fragments.label)}
          }
        }
      `,
      variables: {
        labelId,
        version
      }
    })
  );
}

export function validateLabelSlug ({slug, labelId}) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.validateLabelSlug,
      query: `
        query validateLabelSlug ($slug: String!, $labelId: ID) {
          validateLabelSlug (slug: $slug, labelId: $labelId)
        }
      `,
      variables: {
        slug,
        labelId
      }
    })
  );
}

export function changeLabelFields (values) {
  return {
    type: actionTypes.changeLabelFields,
    values
  };
}

export function changeLabelToDefault () {
  return {
    type: actionTypes.changeLabelToDefault
  };
}
