import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
	data: {
		items: [],
		count: 0
	},
	errors: null
};

export default function labelPickerByTypeReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.labelPickerByType) {
				data.items = action.data.labelPickerByType;
				hasData = true;
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}

			return Object.assign({}, state, defaultState);

		default:
			return state;
	}
}

