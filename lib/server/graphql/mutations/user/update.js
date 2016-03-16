import {
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLInt
} from 'graphql';
import {getProjection} from 'relax-framework';
import pluck from 'lodash.pluck';

import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import userType from '../../types/user';
import labelType from '../../types/label';
import {UserModel} from '../../../models';
import RevisionModel from '../../../models/revision';
const userUpdateInputType = new GraphQLInputObjectType({
	name: 'UserUpdateInputType',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		nickname: {type: new GraphQLNonNull(GraphQLString)},
		avatar: {type: GraphQLString},
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
				name: 'talentInfoInputType',
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
					}
				}
			}))
		},
		fans: {type: new GraphQLList(GraphQLString)},
		fansCount: {type: GraphQLInt},
		isDel: {type: GraphQLString},
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
		const userChanges = Object.assign({}, user._doc, {
			...params.data,
			__v: user.__v + 1,
			updatedAt: new Date()
		});

		const resultUser = await UserModel.findByIdAndUpdate(
			params.data._id,
			userChanges,
			{upsert: true, new: true}
		).select(projection).exec();

		if (!resultUser) {
			throw new Error('Error updating user');
		}
		return resultUser;

	}
};
