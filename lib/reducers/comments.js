/**
 * Created by matonghe on 16/5/9.
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

export default function commentsReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.comments) {
				data.items = action.data.comments;
				hasData = true;
			}
			if (action.data.commentsCount || action.data.commentsCount === 0) {
				data.count = action.data.commentsCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeComment:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (commentIt) => {
						return commentIt._id !== action.data.removeComment._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		default:
			return state;
	}
}
