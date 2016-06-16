/**
 * Created by matonghe on 16/6/16.
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

export default function circlesReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.circles) {
				data.items = action.data.circles;
				hasData = true;
			}
			if (action.data.circlesCount || action.data.circlesCount === 0) {
				data.count = action.data.circlesCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeCircle:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (circleIt) => {
						return circleIt._id !== action.data.removeCircle._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		case actionTypes.recommendCircle:
			return Object.assign({}, state, {
				data: {
					items: state.data.items.map((item) => {
						if(item._id === action.data.recommendCircle._id){
							item.isRecommended = action.data.recommendCircle.isRecommended;
						}
						return item;
					}),
					count: state.data.count
				},
				errors: action.errors
			});
		default:
			return state;
	}
}
