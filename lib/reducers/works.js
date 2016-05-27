/**
 * Created by matonghe on 16/5/17.
 */

import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
	data: {
		items: [],
		count: 0
	},
	errors: null
};

export default function worksReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.works) {
				data.items = action.data.works;
				hasData = true;
			}
			if (action.data.worksCount || action.data.worksCount === 0) {
				data.count = action.data.worksCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeWork:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (workIt) => {
						return workIt._id !== action.data.removeWork._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		default:
			return state;
	}
}
