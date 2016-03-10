import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
	data: {
		items: [],
		count: 0
	},
	errors: null
};

export default function activitiesReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.activities) {
				data.items = action.data.activities;
				hasData = true;
			}
			if (action.data.activitiesCount || action.data.activitiesCount === 0) {
				data.count = action.data.activitiesCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeActivity:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (activityIt) => {
						return activityIt._id !== action.data.removeActivity._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		case actionTypes.addActivity:
			return Object.assign({}, state, {
				data: {
					items: [...state.data.items, action.data.addActivity],
					count: state.data.count + 1
				},
				errors: action.errors
			});
		case actionTypes.recommendActivity:
			return Object.assign({}, state, {
				data: {
					items: state.data.items.map((item) => {
						if(item._id === action.data.recommendActivity._id){
							item.isRecommended = action.data.recommendActivity.isRecommended;
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
