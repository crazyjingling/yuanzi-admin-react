import actionTypes from '../client/actions/types';

const defaultState = {
  data: {},
  errors: 'Not found'
};

export default function labelReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.label) {
        return Object.assign({}, state, {
          data: action.data.label,
          errors: action.errors
        });
      }
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
}
