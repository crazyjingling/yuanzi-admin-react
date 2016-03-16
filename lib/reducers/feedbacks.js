import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
	data: {
		items: [],
		count: 0
	},
	errors: null
};

export default function feedbacksReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.feedbacks) {
				data.items = action.data.feedbacks;
				hasData = true;
			}
			if (action.data.feedbacksCount || action.data.feedbacksCount === 0) {
				data.count = action.data.feedbacksCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		default:
			return state;
	}
}
