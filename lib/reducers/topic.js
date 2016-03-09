import actionTypes from '../client/actions/types';

const defaultState = {
	data: {},
	errors: 'Not found'
};

export default function topicReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.topic) {
				return Object.assign({}, state, {
					data: action.data.topic,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.changeTopicValue:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, {[action.id]: action.value}),
				errors: action.errors
			});
		default:
			return state;
	}
}
