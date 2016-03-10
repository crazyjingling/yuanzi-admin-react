import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
	data: {
		items: [],
		count: 0
	},
	errors: null
};

export default function materialsReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			const data = {};
			let hasData = false;
			if (action.data.materials) {
				data.items = action.data.materials;
				hasData = true;
			}
			if (action.data.materialsCount || action.data.materialsCount === 0) {
				data.count = action.data.materialsCount.count || 0;
				hasData = true;
			}
			if (hasData) {
				return Object.assign({}, state, {
					data: data,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.removeMaterial:
			return Object.assign({}, state, {
				data: {
					items: filter(state.data.items, (materialIt) => {
						return materialIt._id !== action.data.removeMaterial._id;
					}),
					count: state.data.count - 1
				},
				errors: action.errors
			});
		case actionTypes.addMaterial:
			return Object.assign({}, state, {
				data: {
					items: [...state.data.items, action.data.addMaterial],
					count: state.data.count + 1
				},
				errors: action.errors
			});
		case actionTypes.recommendMaterial:
			return Object.assign({}, state, {
				data: {
					items: state.data.items.map((item) => {
						if(item._id === action.data.recommendMaterial._id){
							item.isRecommended = action.data.recommendMaterial.isRecommended;
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
