/**
 * Created by matonghe on 16/6/16.
 */

import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';
export function changeArticleValue (id, value) {
	return {
		type: actionTypes.changeArticleValue,
		id,
		value
	};
}
export function removeArticle(fragments, data) {
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.removeArticle,
			query: `
        mutation removeArticle ($data: String!) {
          removeArticle (data: $data) {
            ${fragmentToQL(fragments.article)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}

export function updateArticle(fragments, data) {
	if (data.isRecommended.stateType === '已上线') {
		data.isRecommended.stateType = 'publish';
	} else {
		data.isRecommended.stateType = 'draft';
	}
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.updateArticle,
			query: `
        mutation updateArticle ($data: ArticleInput!) {
          updateArticle (data: $data) {
            ${fragmentToQL(fragments.article)}
          }
        }
      `,
			variables: {
				data
			}
		})
	);
}
export function recommendArticle(fragments, data, recommendAt) {
	//这里直接改data的值会优先反应到界面上,所以用其他的变量来代替
	let recommendData = {
		_id: data._id
	};
	if (data.isRecommended.stateType === '未上线') {
		recommendData.isRecommended = {
			stateType: 'publish',
			recommendAt: recommendAt
		};

	} else {
		recommendData.isRecommended ={
			stateType: 'draft',
			recommendAt: data.isRecommended.recommendAt
		};

	}
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.recommendArticle,
			query: `
        mutation recommendArticle ($recommendData: RecommendArticleInput!) {
          recommendArticle (data: $recommendData) {
            ${fragmentToQL(fragments.article)}
          }
        }
      `,
			variables: {
				recommendData
			}
		})
	);
}
export function addArticle (fragments, data) {
	console.log(fragments, data);
	return (dispatch) => (
		request({
			dispatch,
			type: actionTypes.addArticle,
			query: `
			mutation addArticle ($data: ArticleInput!) {
			  addArticle (data: $data) {
				${fragmentToQL(fragments.article)}
			  }
			}
		  `,
			variables: {
				data
			}
		})
	);
}
