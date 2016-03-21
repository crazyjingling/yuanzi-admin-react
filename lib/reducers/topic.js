import actionTypes from '../client/actions/types';

var defaultState = {
	data: {
		owner: {
			_id: '',
			nickname: ''
		},
		title: '',
		subTitle: '',
		labels: [],
		cover: {
			ossUrl: '',
			_id: ''
		},
		strategies: []
	},
	errors: ''
};

export default function topicReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.topic) {
				return Object.assign({}, state, {
					data: action.data.topic,
					errors: action.errors
				});
			}
			return Object.assign({}, state);
		case actionTypes.changeTopicToDefault:
			return Object.assign({}, state, defaultState);
		case actionTypes.changeTopicValue:
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
		case actionTypes.addTopic:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, action.data.addTopic),
				errors: action.errors
			});
		case actionTypes.updateTopic:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, action.data.updateTopic),
				errors: action.errors
			});
		default:
			return state;

	}
}
