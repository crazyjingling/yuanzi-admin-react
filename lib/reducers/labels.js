import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  errors: null
};

export default function labelsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      const data = {};
      let hasData = false;
      if (action.data.labels) {
        data.items = action.data.labels;
        hasData = true;
      }
      if (action.data.labelsCount || action.data.labelsCount === 0) {
        data.count = action.data.labelsCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, state, {
          data: data,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.removeLabel:
      return Object.assign({}, state, {
        data: {
          items: filter(state.data.items, (labelIt) => {
            return labelIt._id !== action.data.removeLabel._id;
          }),
          count: state.data.count - 1
        },
		  hasDataChanged: true,
        errors: action.errors
      });
    case actionTypes.addLabel:
      return Object.assign({}, state, {
        data: {
          items: [ action.data.addLabel, ...state.data.items],
          count: state.data.count + 1
        },
        errors: action.errors
      });
	  case actionTypes.updateLabel:
		  return Object.assign({}, state, {
			  data: {
				  items: [ action.data.updateLabel, ...state.data.items],
				  count: state.data.count
			  },
			  errors: action.errors
		  });
    default:
      return state;
  }
}
