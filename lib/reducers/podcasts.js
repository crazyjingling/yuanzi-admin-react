/**
 * Created by matonghe on 16/5/31.
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

export default function podcastsReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.podcasts) {
				data.items = action.data.podcasts;
				hasData = true;
			}
			if (action.data.podcastsCount || action.data.podcastsCount === 0) {
				data.count = action.data.podcastsCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removePodcasts:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (podcastsIt) => {
						return podcastsIt._id !== action.data.removePodcasts._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		case actionTypes.recommendPodcasts:
			return Object.assign({}, state, {
				data: {
					items: state.data.items.map((item) => {
						if(item._id === action.data.recommendPodcasts._id){
							item.isRecommended = action.data.recommendPodcasts.isRecommended;
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
