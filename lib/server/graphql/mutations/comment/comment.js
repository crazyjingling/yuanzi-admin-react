/**
 * Created by matonghe on 16/5/9.
 */

import {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
	GraphQLString
} from 'graphql';
import Q from 'q';
import {getProjection} from 'relax-framework';
import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import commentType from '../../types/comment';
import commentInputType from '../../types/comment-input';
import {CommentModel} from '../../../models';


exports.updateComment = {
	type: commentType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(commentInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		const projection = getProjection(options.fieldASTs[0]);
		return Q()
			.then(()=>CommentModel.findById(params.data._id))
			.then((comment)=>{
				const commentChanges = Object.assign({}, comment._doc, {
					...params.data,
					__v: comment.__v + 1,
					updatedAt: new Date()
				});
				return Q().then(CommentModel.findByIdAndUpdate(
					params.data._id,
					commentChanges,
					{upsert: true, new: true}).select(projection).exec()).then((updateComment) => {
					if (!updateComment) {
						throw new Error('Page not found');
					}
					return updateComment;
				});
			})

	}
};
exports.removeComment = {
	type: commentType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		return CommentModel
			.findByIdAndUpdate(params.data,{'isPassed': true},{upsert: true, new: true})
			.exec()
			.then((removeComment) => {
				if (!removeComment) {
					throw new Error('comment not found');
				}
				return removeComment;
			});
	}
};
