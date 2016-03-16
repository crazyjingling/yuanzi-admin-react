import actionTypes from '../client/actions/types';
import moment from 'moment';
var defaultState = {
	data: {
		avatar: {
			ossUrl: '',
			_id: ''
		},
		account: {
			username: '',
			platform: 'mobile',
			password: '123456'
		},
		nickname: '',
		gender: 'f',
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
			let newUser = state.data;
			//todo: 这里只考虑了key中只有一层嵌套, 例如: account.username
			if (action.id.indexOf('.') !== -1) {
				newUser[action.id.split('.')[0]] = newUser[action.id.split('.')[0]] || {};
				newUser[action.id.split('.')[0]][action.id.split('.')[1]] = action.value;
			} else {
				newUser[action.id] = action.value;
			}
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, newUser),
				errors: action.errors
			});
		case actionTypes.addUser:
			return Object.assign({}, state, {
					data: Object.assign({}, state.data, action.data.addUser),
					errors: action.errors
				});
		default:
			return state;
	}
}
