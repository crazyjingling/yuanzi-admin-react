var rc = require('rc');
var pkg = require('./package.json');
var config;
var ossURI = [];

config = {
	name: pkg.name,
	description: 'yuanzi admin react',
	version: pkg.version,
	port: 3030,
	devPort: 3020,
	monPort: 3001,
	db: [
		'mongodb://101.251.204.44:20000/yuanzi',
		'mongodb://101.251.204.45:20000/yuanzi',
		'mongodb://101.251.204.46:20000/yuanzi'
	],
	uploadDir: './upload',
	uploadSize: '1000mb',
	reConnectTime: 30000,
	// 断线重连时间
	security: {
		'tokenLife': 24 * 60 * 60 * 1000

	},
	sessionSecret: 'yuanzi',
	sessionMaxAge: 24 * 60 * 60 * 1000,
	// SESSION 有效时长
	// pageMaxAge: 3 * 24 * 60 * 60 * 1000, // 静态页面过期时间
	pageMaxAge: 0,
	// 静态页面过期时间
	platform: {
		weibo: 'weibo',
		qq: 'qq',
		mobile: 'mobile',
		mail: 'mail',
		local: 'local',
		weixin: 'weixin'

	},
	weibo: {
		appKey: '2114675498',
		appSecret: 'e9f661eb7844cff78f31e1871f9f48e7',
		callbackURL: 'http://www.iyuanzi.net/auth/weibo/callback'

	},
	qq: {
		appKey: '101061493',
		appSecret: '2fffa1384f4493246b598d70a7043216',
		callbackURL: 'http://www.iyuanzi.net/auth/qq/callback'

	},
	mobile: {
		uid: '千鱼元子',
		key: '7e10b324a810aa9ac82e',
		url: 'http://utf8.sms.webchinese.cn'

	},
	oss: {
		imgSuffix: '@800w_50q.jpg',
		imgDomain: 'http://assets.iyuanzi.net/',
		otherDomain: 'http://img.iyuanzi.net/',
		accessKeyId: 'ewy2K0qbHbC8vJOB',
		accessKeySecret: 'nzOKSZ3aXctzCfR0GQff1thuH497OA',
		bucket: 'yuanzi-beijing',
		host: 'oss-cn-beijing.aliyuncs.com',
		port: 80,
		userAvatarObject: 'userAvatar/',
		cardImgObject: 'cardImg/',
		cardMp3Object: 'cardMp3/',
		cardVideoObject: 'cardVideo/',
		cardCoverObject: 'cardCover/',
		sliderCoverObject: 'sliderCover/',
		themeCoverObject: 'themeCover/',
		topCoverObject: 'topCover/',
		topicCoverObject: 'topicCover/',
		topicContentObject: 'topicContent/',
		topIconObject: 'topIcon/',
		topicIconObject: 'topicIcon/',
		photoObject: 'photo/',
		materialObject: 'materials/',
		cardHtmlObject: 'cardDescription/',
		userHtmlObject: 'userDescription/',
		bannerCoverObject: 'bannerCover/',
		strategyImgObject: 'strategyImg/',
		strategyMp3Object: 'strategyMp3/',
		strategyHtmlObject: 'strategyDescription/',
		strategyCoverObject: 'strategyCover/'
	},
	baidu: {
		appKey: 'OYE7nL2GFYyGhszTG3oblmIH',
		appSecret: 'qTvDdlSwazA5sE9y2BWGylz9gq7hDaRM'

	},
	appStore: {
		androidAddr: 'http://www.iyuanzi.com/iyuanzi.apk',
		iosAddr: 'https://itunes.apple.com/us/app/yuan-zi/id896513476?l=zh&ls=1&mt=8'

	},
	redis: {
		port: '6379',
		ip: '101.251.204.46'

	},
	domobToken: {
		domobtoken: 'eb61057aabd609b8fd5ee35b19aeb4d2'

	},
	avos: {
		appId: 'cbz3iy9f47mvirszhhfepphoyocm1uorzrps7w9tsb71h3ix',
		appKey: 'yyfaa0q0b39id369booapg9xh5eitoggz48aejio54zybabp',
		masterKey: 'rhsolt5kp9dn4lret2ogz5d6tir2irb80pxixiyzhub9hum5'

	},
	kafka: {
		port: '2181',
		ip: '101.251.204.44'
	}

};

ossURI.push('http://img.iyuanzi.net/');
config.dbURI = config.db.join(',');
config.oss.uri = ossURI.join('');

module.exports = rc('yuanzi-admin-react', config);
