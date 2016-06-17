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
		params.data.targetUser = params.data.targetUser._id;
		params.data.commentUser = params.data.commentUser._id;
		const projection = getProjection(options.fieldASTs[0]);
		return CommentModel
			.findByIdAndUpdate(params.data._id,{'isPassed': false},{upsert: true, new: true})
			.exec()
			.then((updateComment) => {
				if (!updateComment) {
					throw new Error('comment not found');
				}
				return updateComment;
			});
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
