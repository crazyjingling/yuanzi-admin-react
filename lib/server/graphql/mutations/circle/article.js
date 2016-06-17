/**
 * Created by matonghe on 16/6/17.
 */

import {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
	GraphQLString
} from 'graphql';
import Q from 'q';
import authorize from '../../authorize';
import articleType from '../../types/article';
import {ArticleModel} from '../../../models';
exports.removeArticle = {
	type: articleType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		return ArticleModel
			.findByIdAndUpdate(params.data,{'isDel': true},{upsert: true, new: true})
			.exec()
			.then((removeArticle) => {
				if (!removeArticle) {
					throw new Error('article not found');
				}
				return removeArticle;
			});
	}
};
