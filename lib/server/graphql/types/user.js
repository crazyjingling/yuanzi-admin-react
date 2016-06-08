import {
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType
} from 'graphql';
import labelType from './label';
import {LabelModel,MediaModel} from '../../models';

const userType = new GraphQLObjectType({
	name: 'User',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		nickname: {type: new GraphQLNonNull(GraphQLString)},
		avatar: {
			type: new GraphQLObjectType({
				name: 'avatarType',
				fields: {
					_id: {
						type: GraphQLString,
						resolve: (media, params, options) => media._id||''

					},
					ossUrl: {
						type: GraphQLString,
						resolve: (media, params, options) => media.ossUrl||''

					}
				}
			}),
			async resolve (schemaEntry, params, options) {
				return (await MediaModel.findOne({ossUrl: schemaEntry.avatar})
					.select({
						_id: 1,
						ossUrl: 1
					})
					.exec()) || {};
			}
		},
		email: {type: GraphQLString},
		position: {type: GraphQLString},
		contactInfo: {type: GraphQLString},
		role: {
			type: new GraphQLList(labelType),
			async resolve (schemaEntry, params, options) {
				return schemaEntry.labels.length ? (await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec()) : [];
			}
		},
		account: {
			type: new GraphQLObjectType({
				name: 'accountType',
				fields: {
					platform: {
						type: GraphQLString
					},
					username: {
						type: GraphQLString
					},
					hashedPassword: {
						type: GraphQLString
					}
				}
			})
		},
		baby: {
			type: new GraphQLObjectType({
				name: 'babyType',
				fields: {
					gender: {
						type: GraphQLString
					},
					birth: {
						type: GraphQLString
					}
				}
			})
		},
		owner: {
			type: new GraphQLObjectType({
				name: 'userOwnerType',
				fields: {
					_id: {
						type: GraphQLString
					},
					nickname: {
						type: GraphQLString
					}
				}
			})
		},
		description: {type: GraphQLString},
		talentStatus: {
			type: GraphQLString
		},
		talentInfo: {
			type: new GraphQLObjectType({
				name: 'talentInfoType',
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
			})},
		labels: {
			type: new GraphQLList(labelType),
			async resolve (schemaEntry, params, options) {
				return schemaEntry.labels.length ? (await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec()) : [];
			}
		},
		fans: {type: new GraphQLList(GraphQLString)},
		fansCount: {type: GraphQLInt},
		isDel: {type: GraphQLString},
		gender: {type: GraphQLString},
		createdAt: {type: GraphQLString}
	}
});

export default userType;
