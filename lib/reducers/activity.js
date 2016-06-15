import actionTypes from '../client/actions/types';

var defaultState = {
	data: {
		owner: {
			_id: '',
			nickname: ''
		},
		title: '',
		price: 0,
		isBanner: false,
		number: 0,
		enrollCount: 0,
		location: '',
		content: '',
		startDate: '',
		endDate: '',
		cover: {
			ossUrl: '',
			_id: ''
		},
		bannerImg: {
			ossUrl: '',
			_id: ''
		},
		pictureContent: {
			ossUrl: '',
			_id: ''
		}

	},
	errors: ''
};
export default function activityReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.activity) {
				return Object.assign({}, state, {
					data: action.data.activity,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.changeActivityValue:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, {[action.id]: action.value}),
				errors: action.errors
			});
		case actionTypes.addActivity:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, action.data.addActivity),
				errors: action.errors
			});
		default:
			return state;
	}
}
