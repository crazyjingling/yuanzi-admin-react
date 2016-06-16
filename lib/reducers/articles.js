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

export default function articlesReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.articles) {
				data.items = action.data.articles;
				hasData = true;
			}
			if (action.data.articlesCount || action.data.articlesCount === 0) {
				data.count = action.data.articlesCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeArticle:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (articleIt) => {
						return articleIt._id !== action.data.removeArticle._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		case actionTypes.recommendArticle:
			return Object.assign({}, state, {
				data: {
					items: state.data.items.map((item) => {
						if(item._id === action.data.recommendArticle._id){
							item.isRecommended = action.data.recommendArticle.isRecommended;
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
