import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
	data: {
		items: []
	},
	errors: null
};

export default function strategySearchReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.strategySearch) {
				data.items = action.data.strategySearch;
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
