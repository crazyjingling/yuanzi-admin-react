import {
	GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import userType from '../../types/user';
import userInputType from '../../types/user-input';
import {UserModel,RefreshTokenModel,AccessTokenModel} from '../../../models';
import crypto from 'crypto';
import pluck from 'lodash.pluck';
export default {
	type: userType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(userInputType)
		}
	},
	resolve (root, params, options) {
		delete params.data._id;
		params.data.owner = root.user._id;
		params.data.avatar = params.data.avatar.ossUrl;
		params.data.labels = pluck(params.data.labels, '_id');
		if(params.data.labels.length){
			params.data.talentStatus = 'done';
		}
		params.data.clientId = 'ios';
		var newUserRes;


		return Q()
			.then(() => UserModel.findOne({'account.username': params.data.account.username}).exec())
			.then((user) => {
				if (user) {
					throw new Error('该手机号用户已存在');
				}
				else {
					if (!params.data.account.password) {
						params.data.account.password = crypto.createHmac('sha1', this.account.salt).update(params.data.account.username).digest('hex');
					}
					console.log('=================================params.dat', params.data);
					const profile = new UserModel(params.data);
					return profile.save();
				}

			}).then((newUser) => {
				newUserRes = newUser;
				if (newUserRes) {
					return [
						RefreshTokenModel.remove({
						userId: newUserRes.userId,
						clientId: params.data.clientId

					}),AccessTokenModel.remove({
						userId: newUserRes.userId,
						clientId: params.data.clientId

					})];

				}else{
					throw new Error('服务器错误,保存出错');
				}
			})
			.then(() => {
				var tokenValue = crypto.randomBytes(32).toString('base64');
				var refreshTokenValue = crypto.randomBytes(32).toString('base64');
				var token = new AccessTokenModel({
					token: tokenValue,
					clientId: params.data.clientId,
					userId: newUserRes.userId

				});
				var refreshToken = new RefreshTokenModel({
					token: refreshTokenValue,
					clientId: params.data.clientId,
					userId: newUserRes.userId

				});
				return [refreshToken.save(), token.save()];
			}).then(()=>newUserRes)
			.catch(function (error) {
				console.log('=================================erroruserAdd', error);
				throw error;
			});
	}
};
