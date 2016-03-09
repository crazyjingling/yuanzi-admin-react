import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
	data: {
		items: [],
		count: 0
	},
	errors: null
};

export default function topicsReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.topics) {
				data.items = action.data.topics;
				hasData = true;
			}
			if (action.data.topicsCount || action.data.topicsCount === 0) {
				data.count = action.data.topicsCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeTopic:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (topicIt) => {
						return topicIt._id !== action.data.removeTopic._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		case actionTypes.addTopic:
			return Object.assign({}, state, {
				data: {
					items: [...state.data.items, action.data.addTopic],
					count: state.data.count + 1
				},
				errors: action.errors
			});
		case actionTypes.recommendTopic:
			return Object.assign({}, state, {
				data: {
					items: state.data.items.map((item) => {
						if(item._id === action.data.recommendTopic._id){
							item.isRecommended = action.data.recommendTopic.isRecommended;
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
