import actionTypes from '../client/actions/types';

var defaultState = {
	data: {
		title: '',
		subTitle: '',
		labels: [],
		type: '经验妙招',
		scope: 1,
		owner: {
			_id: '',
			nickname: ''
		},
		cover: {
			ossUrl: '',
			_id: ''
		},
		materials: [],
		tools: [],
		steps: [],
		degree: 1,
		consumingTime: 1,
		soundStory: '',
		soundStoryLength: 0
	},
	errors: ''
};

export default function strategyReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.strategy) {
				return Object.assign({}, state, {
					data: action.data.strategy,
					errors: action.errors
				});
			}
			return Object.assign({}, state);
		case actionTypes.changeStrategyToDefault:
			return Object.assign({}, state, defaultState);
		case actionTypes.changeStrategyValue:
			let newData = state.data;
			//todo: 这里只考虑了key中只有一层嵌套, 例如: account.username
			if (action.id.indexOf('.') !== -1) {
				newData[action.id.split('.')[0]] = newData[action.id.split('.')[0]] || {};
				newData[action.id.split('.')[0]][action.id.split('.')[1]] = action.value;
			} else {
				newData[action.id] = action.value;
			}
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, newData),
				errors: action.errors
			});
		case actionTypes.addStrategy:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, action.data.addStrategy),
				errors: action.errors
			});
		case actionTypes.updateStrategy:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, action.data.updateStrategy),
				errors: action.errors
			});
		default:
			return state;

	}
}
