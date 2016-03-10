import actionTypes from '../client/actions/types';

const defaultState = {
	data: {},
	errors: 'Not found'
};

export default function activityReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.activity) {
				return Object.assign({}, state, {
					data: action.data.activity,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.changeActivityValue:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, {[action.id]: action.value}),
				errors: action.errors
			});
		default:
			return state;
	}
}
