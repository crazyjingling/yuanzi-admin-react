import actionTypes from '../client/actions/types';

const defaultState = {
	data: {},
	errors: 'Not found'
};

export default function materialReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.material) {
				return Object.assign({}, state, {
					data: action.data.material,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.changeMaterialValue:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, {[action.id]: action.value}),
				errors: action.errors
			});
		default:
			return state;
	}
}
