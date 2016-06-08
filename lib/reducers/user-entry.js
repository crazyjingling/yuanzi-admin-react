import actionTypes from '../client/actions/types';
import moment from 'moment';
const defaultState = {
	data: {
		_id: '',
		avatar: {
			ossUrl: '',
			_id: ''
		},
		account: {
			username: '',
			platform: 'mobile'
		},
		nickname: '',
		gender: 'm',
		baby: {
			birth: '',
			gender: 'm'
		},
		labels: [],
		description: ''
	},
	errors: ''
};

export default function userEntryReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.changeUserEntryValue:
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
		case actionTypes.changeUserEntryToDefault:
			return Object.assign({}, state, defaultState);
		case actionTypes.addUser:
			return Object.assign({}, state, {
					data: Object.assign({}, state.data, action.data.addUser),
					errors: action.errors
				});
		default:
			return Object.assign({}, state, defaultState);
	}
}
