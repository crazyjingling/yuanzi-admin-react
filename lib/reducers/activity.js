import actionTypes from '../client/actions/types';

var defaultState = {
	data: {
		owner: {
			_id: '',
			nickname: ''
		},
		title: '',
		startDate: '',
		endDate: '',
		cover: {
			ossUrl: '',
			_id: ''
		},
	},
	errors: ''
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
