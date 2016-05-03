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
	  case actionTypes.changeLabelFields:
		  let newData = state.data;
		  //todo: 这里只考虑了key中只有一层嵌套, 例如: account.username
		  if (action.id.indexOf('.') !== -1) {
			  newData[action.id.split('.')[0]] = newData[action.id.split('.')[0]] || {};
			  newData[action.id.split('.')[0]][action.id.split('.')[1]] = action.value;
		  } else {
			  newData[action.id] = action.value;
		  }
		  return Object.assign({}, state, {
			  data: Object.assign({}, state.data, newData),
			  errors: action.errors
		  });
    default:
      return state;
  }
}
