/**
 * Created by matonghe on 16/5/5.
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

export default function ordersReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.orders) {
				data.items = action.data.orders;
				hasData = true;
			}
			if (action.data.ordersCount || action.data.ordersCount === 0) {
				data.count = action.data.ordersCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeOrder:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (orderIt) => {
						return orderIt._id !== action.data.removeOrder._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		default:
			return state;
	}
}
