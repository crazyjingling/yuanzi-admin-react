import {
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLBoolean
} from 'graphql';
import {getProjection} from 'relax-framework';
import pluck from 'lodash.pluck';
import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import userType from '../../types/user';
import labelType from '../../types/label';
import {UserModel, WorkModel, ArticleModel, CircleModel, CommentModel} from '../../../models';
import RevisionModel from '../../../models/revision';
import Q from 'q';

const userUpdateInputType = new GraphQLInputObjectType({
	name: 'UserUpdateInputType',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		nickname: {type: GraphQLString},
		avatar: {type: new GraphQLInputObjectType({
			name: 'avatarUpdateInputType',
			fields: {
				_id: {
					type: GraphQLString
				},
				ossUrl: {
					type: GraphQLString
				}
			}
		})},
		account: {
			type: new GraphQLInputObjectType({
				name: 'accountInputType',
				fields: {
					platform: {
						type: GraphQLString
					},
					username: {
						type: GraphQLString
					}
				}
			})
		},
		talentStatus: {
			type: GraphQLString
		},
		talentInfo: {
			type: new GraphQLInputObjectType({
				name: 'talentInfoUpdateInputType',
				fields: {
					name: {
						type: GraphQLString
					},
					mobile: {
						type: GraphQLString
					},
					wechat: {
						type: GraphQLString
					},
					goodAt: {
						type: GraphQLString
					},
					goodAtOther: {
						type: GraphQLString
					}
				}
			})
		},
		labels: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'userLabelsInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					},
					type: {
						type: GraphQLString
					}
				}
			}))
		},
		fans: {type: new GraphQLList(GraphQLString)},
		fansCount: {type: GraphQLInt},
		isDel: {type: GraphQLBoolean},
		gender: {type: GraphQLString},
		createdAt: {type: GraphQLString}
	}
});
export default {
	type: userType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(userUpdateInputType)
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		const user = await UserModel.findById(params.data._id);
		params.data.labels = pluck(params.data.labels, '_id');
		params.data.avatar = params.data.avatar.ossUrl;
		if(params.data.labels.length > 0){
			params.data.talentStatus = 'done';
		}else{
			if(params.data.talentStatus === '等待审核'){
				params.data.talentStatus = 'waitting';
			}if(params.data.talentStatus === '审核通过'){
				params.data.talentStatus = 'done';
			}if(params.data.talentStatus === '忽略申请'){
				params.data.talentStatus = 'rejected';
			}if(params.data.talentStatus === '未提申请'){
				params.data.talentStatus = 'undone';
			}
		}
		if(params.data.gender === '女'){
			params.data.gender = 'n'
		}else {
			params.data.gender = 'f'
		}
		const userChanges = Object.assign({}, user._doc, {
			...params.data,
			__v: user.__v + 1,
			updatedAt: new Date()
		});
		userChanges.account = user._doc.account;
		return Q()
			.then(() => {
				WorkModel.update({owner: params.data._id}, {'$set': { 'isDel': params.data.isDel}},{ "multi": true }).exec();
			}).then(() => {
				ArticleModel.update({owner: params.data._id}, {'$set': { 'isDel': params.data.isDel}},{ "multi": true }).exec();
			}).then(() => {
				CommentModel.update({commentUser: params.data._id}, {'$set': { 'isPassed': !params.data.isDel}},{ "multi": true }).exec();
			}).then(() => UserModel.findByIdAndUpdate(
				params.data._id,
				userChanges,
				{upsert: true, new: true}
			).select(projection).exec())
			.then((resultUser) => {
				if (!resultUser) {
					throw new Error('Page not found');
				}
				return resultUser;
			});
	}
};
