import actionTypes from '../client/actions/types';

const defaultState = {
  	data: {
		title:'',
		type:'',
		cover:{
			ossUrl: '',
			_id: ''
		}
	},

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
	  case actionTypes.addLabel:
		  return Object.assign({}, state, {
			  data: Object.assign({}, state.data, action.data.addLabel),
			  errors: action.errors
		  });
    default:
      return state;
  }
}
