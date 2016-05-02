var rc = require('rc');
var pkg = require('./package.json');
var dotenv = require('dotenv');
var variableExpansion = require('dotenv-expand');
const yuanziEnv = dotenv.config();
variableExpansion(yuanziEnv);
var config;
var ossURI = [];

config = {
	name: pkg.name,
	description: 'yuanzi admin react',
	version: pkg.version,
	port: yuanziEnv.HOST_PORT,
	devPort: yuanziEnv.DEV_HOST_POST,
	monPort: yuanziEnv.MON_PORT,
	db: [
		yuanziEnv.DB_URL
	],
	uploadDir: './upload',
	uploadSize: '1000mb',
	reConnectTime: 30000,
	// 断线重连时间
	security: {
		'tokenLife': yuanziEnv.SECURITY_TOKENLIFE
	},
	sessionSecret: 'yuanzi',
	sessionMaxAge: 24 * 60 * 60 * 1000,
	pageMaxAge: 0,
	// 静态页面过期时间
	oss: {
		imgSuffix: yuanziEnv.OSS_CONFIG_IMGSUFFIX,
		imgDomain: yuanziEnv.OSS_CONFIG_IMGDOMAIN,
		otherDomain: yuanziEnv.OSS_CONFIG_OTHERDOMAIN,
		accessKeyId: yuanziEnv.OSS_CONFIG_ACCESSKEY,
		accessKeySecret: yuanziEnv.OSS_CONFIG_SECRET,
		bucket: yuanziEnv.OSS_CONFIG_BUCKET,
		host: yuanziEnv.OSS_CONFIG_HOST,
		port: yuanziEnv.OSS_CONFIG_PORT,
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
		cardHtmlObject: 'cardDescription/',
		userHtmlObject: 'userDescription/'

	},
	//platform: JSON.parse(yuanziEnv.PLATFORM_CONFIG),

	weibo: JSON.parse(yuanziEnv.WEIBO_CONFIG),
	qq: JSON.parse(yuanziEnv.QQ_CONFIG),
	mobile: JSON.parse(yuanziEnv.MOBILE_CONFIG),
	appStore: JSON.parse(yuanziEnv.APPSTORE_CONFIG),
	redis: JSON.parse(yuanziEnv.REDIS_CONFIG),
	avos: JSON.parse(yuanziEnv.AVOS_CONFIG)

};

ossURI.push(yuanziEnv.OSS_CONFIG_OTHERDOMAIN);
config.dbURI = config.db.join(',');
config.oss.uri = ossURI.join('');

module.exports = rc('yuanzi-admin-react', config);
