import mongoose from 'mongoose';
import crypto from 'crypto';
import moment from 'moment';
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
	owner: {
		type: ObjectId,
		ref: 'UserV2'
	},
	nickname: { // 昵称
		type: String,
		required: true,
		default: '小元子'

	},
	email: { // 邮箱
		type: String
	},
	position: { // 职位
		type: String
	},
	contactInfo: { // 联系方式
		type: String
	},
	_plainPassword: {
		type: String

	},
	account: {
		username: { // 登陆账号
			type: String,
			unique: true
			//            required: true

		},
		hashedPassword: { // 密码
			type: String,
			required: true

		},
		ThirdPartyId: { // 第三方（mobile除外）ID
			type: String

		},
		token: { // 第三方（mobile除外）登陆平台token
			type: String

		},
		platform: { // 登陆平台
			type: String,
			enum: [
				'weibo',
				'qq',
				'mobile',
				'local',
				'weixin'
			],
			required: true,
			get: function (platform) {
				let platformRes = '';
				switch (platform) {
					case 'weibo':
						platformRes = '微博';
						break;
					case 'qq':
						platformRes = 'QQ';
						break;
					case 'mobile':
						platformRes = '手机';
						break;
					case 'weixin':
						platformRes = '微信';
						break;
					default:
						platformRes = '后台';
				}
				return platformRes;
			}

		},
		signPlugins: [], // 插件token等信息
		salt: {
			type: String,
			required: true

		}

	},
	labels: {
		type: [
			{
				type: ObjectId,
				ref: 'label'

			}
		]

	},
	gender: {
		type: String,
		default: 'm', // 性别，m：男、f：女、n：未知
		enum: [
			'm',
			'f'
		],
		get: function (gender) {
			return gender === 'm' ? '男' : '女';
		}
	},
	avatar: { // 头像
		type: String,
		set: function (avatar) {
			return avatar || 'http://assets.iyuanzi.net/userAvatar/default';
		}

	},
	themeStyle: {
		avatarBgImg: {
			type: String,
			default: 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1',
			get: function (avatarBgImg) {
				return avatarBgImg || 'http://assets.iyuanzi.net/cardDescription/public/images/avatarBgImg1';
			}
		}

	},
	description: { // 简介
		type: String,
		default: ''

	},
	subTitle: {
		type: String,
		default: ''

	},
	role: { // 角色
		type: [
			{
				type: ObjectId,
				ref: 'Role'

			}
		]

	},
	fans: { // 粉丝
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'

			}
		]

	},
	followers: { // 关注
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'

			}
		]

	},
	baby: {
		birth: {
			type: Date,
			default: Date.now,
			get: function (date) {
				return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
			}
		},
		gender: {
			type: String,
			default: 'm', // 性别，m：男、f：女、n：未知
			enum: [
				'm',
				'f',
				'n'
			]

		}

	},
	location: { // 用户所在地
		type: String,
		default: '',
		validate: function (location) {
			return location.length <= 15; // 用户选择字典而来，不会超过15个字
		}

	},
	isDel: { // 是否封号
		type: Boolean,
		default: false,
		get: function (isDel) {
			return isDel ? '封号' : '正常';
		}

	},
	onLabelTop: {//
		type: Date,
		default: Date.now
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	updatedAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	talentStatus: {
		type: String,
		default: 'undone',
		enum: [
			'undone',
			'waitting',
			'done'
		]
	},
	talentInfo: {
		name: {
			type: String
		},
		mobile: {
			type: String
		},
		wechat: {
			type: String
		},
		goodAt: {
			type: String
		},
		goodAtOther: {
			type: String
		}
	}
}, {
	id: false,
	toObject: {
		getters: true,
		setters: true

	},
	toJSON: {
		getters: true,
		setters: true
	}

});
var Client = new Schema({
	name: {
		type: String,
		unique: true,
		required: true

	},
	clientId: {
		type: String,
		unique: true,
		required: true

	},
	clientSecret: {
		type: String,
		required: true

	}

});
var AccessToken = new Schema({
	userId: {
		type: String,
		required: true

	},
	clientId: {
		type: String,
		required: true

	},
	token: {
		type: String,
		unique: true,
		required: true

	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}

	}

});
var RefreshToken = new Schema({
	userId: {
		type: String,
		required: true

	},
	clientId: {
		type: String,
		required: true

	},
	token: {
		type: String,
		unique: true,
		required: true

	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}

	}

});

userSchema.methods.encryptPassword = function (password) {
	return crypto.createHmac('sha1', this.account.salt).update(password).digest('hex');
// more secure – return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

userSchema.virtual('userId').get(function () {
	return this._id;
});

userSchema.virtual('account.password').set(function (password) {
	this._plainPassword = password;
	this.account.salt = crypto.randomBytes(32).toString('base64');
	// more secure - this.salt = crypto.randomBytes(128).toString('base64');
	this.account.hashedPassword = this.encryptPassword(password);
}).get(function () {
	return this._plainPassword;
});

userSchema.virtual('fansCount').get(function () {
	return (this.fans && this.fans.length) || 0;
});

userSchema.virtual('followersCount').get(function () {
	return (this.followers && this.followers.length) || 0;
});

userSchema.methods.checkPassword = function (password) {
	return this.encryptPassword(password) === this.account.hashedPassword;
};
// // todo 宝宝年龄的标签还用吗？
// userSchema.options.toObject.transform = function (doc, ret) {
//   delete ret.__v;
//   delete ret._id;
//   delete ret._plainPassword;
//   if(doc.labels){
//     var ageLabel = common.babyAgeLabel(doc._doc.baby.birth);
//     ret.labels = ageLabel.concat(doc.labels);
//   }
// };


var UserModel = mongoose.model('UserV2', userSchema);
var ClientModel = mongoose.model('client', Client);
var AccessTokenModel = mongoose.model('accesstoken', AccessToken);
var RefreshTokenModel = mongoose.model('refreshtoken', RefreshToken);

export default {UserModel, ClientModel, AccessTokenModel, RefreshTokenModel};
