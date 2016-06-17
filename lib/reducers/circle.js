/**
 * Created by matonghe on 16/6/16.
 */
import actionTypes from '../client/actions/types';

var defaultState = {
	data: {
		owner: {
			_id: '',
			nickname: ''
		},
		name: '',
		cover: {
			ossUrl: '',
			_id: ''
		},
		summary: ''
	},
	errors: ''
};
export default function circleReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.circle) {
				return Object.assign({}, state, {
					data: action.data.circle,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.changeCircleValue:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, {[action.id]: action.value}),
				errors: action.errors
			});
		case actionTypes.addCircle:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, action.data.addCircle),
				errors: action.errors
			});
		default:
			return state;
	}
}
