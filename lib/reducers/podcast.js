/**
 * Created by matonghe on 16/5/30.
 */
import actionTypes from '../client/actions/types';

var defaultState = {
	data: {
		owner: {
			_id: '',
			nickname: ''
		},
		title: '',
		lecturerIntroduction: '',
		price: 0,
		isBanner: false,
		enrollCount: 0,
		content: '',
		lecturer: '',
		roomNumber: '',
		presenter: '',
		startDate: '',
		cover: {
			ossUrl: '',
			_id: ''
		},
		bannerImg: {
			ossUrl: '',
			_id: ''
		},
		lecturerAvatar: {
			ossUrl: '',
			_id: ''
		}
	},
	errors: ''
};
export default function podcastReducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actionTypes.getAdmin:
			if (action.data.podcast) {
				return Object.assign({}, state, {
					data: action.data.podcast,
					errors: action.errors
				});
			}
			return state;
		case actionTypes.changePodcastValue:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, {[action.id]: action.value}),
				errors: action.errors
			});
		case actionTypes.addPodcast:
			return Object.assign({}, state, {
				data: Object.assign({}, state.data, action.data.addPodcast),
				errors: action.errors
			});
		default:
			return state;
	}
}
