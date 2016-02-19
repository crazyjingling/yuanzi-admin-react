import mongoose, {Schema} from 'mongoose';
import moment from 'moment';
import deepPopulate from 'mongoose-deep-populate';
import uniqueValidator from 'mongoose-unique-validator';
//import autoIncrement from 'mongoose-auto-increment';
//import {mongoConnection as connection} from '../../common';
import _ from 'lodash';
var ObjectId = Schema.Types.ObjectId;
//todo:妙招编号自增
//autoIncrement.initialize(connection);
var stepSchema = new Schema({ // 加载图片
  imgUrl: {
    type: String,
    default: ''

  },
  timePoint: { // 截止时间节点
    type: Number,
    default: 0
  }

}, {
  id: false,
  toObject: {
    getters: true

  },
  toJSON: {
    getters: true

  }

});
var strategyCommentSchema = new Schema({ // 妙招评论、回复
  commentUser: { // 评论者
    type: ObjectId,
    ref: 'UserV2',
    required: true

  },
  targetUser: { // 评论对象
    type: ObjectId,
    ref: 'UserV2'

  },
  content: { // 内容
    type: String,
    required: true

  },
  isReported: { // 举报
    type: Boolean,
    default: false

  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  }

}, {
  id: false,
  toObject: {
    getters: true

  },
  toJSON: {
    getters: true

  }

});
var userScoreSchema = new Schema({// 图片 + 描述
  user: {
    type: ObjectId,
    ref: 'UserV2',
    required: true
  },
  score: {
    type: String,
    default: 'level5',
    enum: [
      'level1',
      'level2',
      'level3',
      'level4',
      'level5'
    ]
  }

}, {
  id: false,
  toObject: {
    getters: true

  },
  toJSON: {
    getters: true

  }

});
var collectSchema = new Schema({// 图片 + 描述
  user: {
    type: ObjectId,
    ref: 'UserV2'
  },
  collectedAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  }

}, {
  id: false,
  toObject: {
    getters: true

  },
  toJSON: {
    getters: true

  }

});
var reportSchema = new Schema({// 图片 + 描述
  user: {
    type: ObjectId,
    ref: 'UserV2'
  },
  operatedAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  reason: {
    type: String,
    default: ''
  }

}, {
  id: false,
  toObject: {
    getters: true

  },
  toJSON: {
    getters: true

  }

});
var strategySchema = new Schema({
  strategyNo: { // 妙招编号
    type: String,
    required: true,
    unique: true

  },
  cover: {
    type: String,
    default: ''
  },
  owner: { // 妙招作者
    type: ObjectId,
    ref: 'User',
    required: true

  }, // own user id
  title: { // 标题
    type: String,
    required: true,
    validate: function (val) {
      return val.length <= 20;
    }

  },
  labels: {
    type: [
      {
        type: ObjectId,
        ref: 'Label'

      }
    ]

  },
  content: { // 正文
    type: String,
    default: ''

  },
  subTitle: { // 副标题
    type: String,
    default: ''

  },
  description: { // 描述
    type: String,
    default: ''

  },
  soundStory: {
    type: String,
    default: ''

  },
  soundStoryLength: {
    type: Number,
    default: 0

  },
  steps: { // 图片顺序及播放时间、
    type: [
      stepSchema
    ]

  },
  comments: { // 评论
    type: [
      strategyCommentSchema
    ]

  },
  playUsers: { // 播放者
    type: [
      {
        type: ObjectId,
        ref: 'UserV2'

      }
    ]

  },
  collectUsers: { // 收藏者
    type: [
      collectSchema
    ]
  },
  sharedUsers: { // 分享者
    type: [
      {
        type: ObjectId,
        ref: 'UserV2'
      }
    ]
  },
  reportUsers: { // 举报者
    type: [
      reportSchema
    ]
  },
  isRecommended: { // 推荐
    stateType: {
      type: String,
      default: 'undone',
      enum: [
        'done',
        'undone'
      ] // 推荐，未被推荐

    },
    recommendAt: {
      type: Date,
      get: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      }

    }
  },
  photoCount: { //作品数
    type: Number,
    default: 0
  },
  userScores: { // 用户评分
    type: [
      userScoreSchema
    ]

  },
  scores: {
    level1: {
      type: Number,
      default: 0
    },
    level2: {
      type: Number,
      default: 0
    },
    level3: {
      type: Number,
      default: 0
    },
    level4: {
      type: Number,
      default: 0
    },
    level5: {
      type: Number,
      default: 0
    }

  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }

  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }

  },
  //虚拟数
  artificialCount: {
    type: Number,
    default: 0
  },
  artificialdata: {
    artificialtrycount: {
      type: Number,
      default: 0
      //_.random(500, 1000)
    },
    artificialscore: {
      type: Number,
      default: 0
      //_.round(_.random(6.0, 9.0), 1)
    }
  }


}, {
  id: false,
  toObject: {
    getters: true

  },
  toJSON: {
    getters: true

  }

});
stepSchema.virtual('stepId').get(function () {
  return this._id;
});
strategyCommentSchema.virtual('commentId').get(function () {
  return this._id;
});
strategySchema.virtual('strategyId').get(function () {
  return this._id;
});
strategySchema.virtual('commentCount').get(function () {
  return (this.comments && this.comments.length) || 0;
});

strategySchema.virtual('collectCount').get(function () {
  return (this.collectUsers && this.collectUsers.length) || 0;
});
strategySchema.virtual('sharedCount').get(function () {
  return (this.sharedUsers && this.sharedUsers.length) || 0;
});
strategySchema.virtual('tryCount').get(function () {
  var scoreCount = (this.userScores && this.userScores.length) ? this.userScores.length : 0;
  return this.photoCount + scoreCount;
});
strategySchema.virtual('playCount').get(function () {
  //return (this.playUsers && this.playUsers.length) || 0;
  //请先设置更新数据库中的artificialCount的值
  var count = (this.playUsers && this.playUsers.length) || 0;
  return count + parseInt(this.artificialCount);
});
//strategySchema.virtual('score').get(function () {
//	common.calculateScore(this.scores, function (err, res) {
//		console.log("====mth====="+res);
//		return res;
//	});
//
//});
strategySchema.virtual('isReported').get(function () {
  return (this.reportUsers && this.reportUsers.length) ? true : false;
});
//strategySchema.plugin(autoIncrement.plugin, {
//  model: 'Strategy',
//  field: 'strategyNo',
//  startAt: 1
//});
strategySchema.static('findByIdAndUpdateM', function (id, update, callback) {
  var populateOpt = {
    path: 'comments.commentUser comments.targetUser',
    select: 'nickname avatar'

  };
  return this.findByIdAndUpdate(id, update, {
    new: true,
    fields: {
      comments: {
        $slice: -1
      }
    }
  }).populate(populateOpt).exec(callback);
});
strategySchema.static('findByNo', function (strategyNo, callback) {
  return this.findOne({
    strategyNo: strategyNo

  }, callback);
});
strategySchema.plugin(uniqueValidator);
strategySchema.options.toObject.transform = function (doc, ret) {
  delete ret.__v;
  delete ret._id;
};
collectSchema.options.toObject.transform = function (doc, ret) {
  delete ret.__v;
  delete ret._id;
};
userScoreSchema.options.toObject.transform = function (doc, ret) {
  delete ret.__v;
  delete ret._id;
};
strategyCommentSchema.options.toObject.transform = function (doc, ret) {
  if (ret.commentUser) {
    delete ret.commentUser._id;
  }
  if (ret.targetUser) {
    delete ret.targetUser._id;
  }
};
//todo: deepPopulate使用时报错
//strategySchema.plugin(deepPopulate, {
//  populate: {
//    'owner': {
//      select: 'nickname avatar baby labels'
//    },
//    'owner.labels': {
//      select: 'title type color display', match: { display: true }
//    },
//    'comments.commentUser': {
//      select: 'nickname avatar'
//    },
//    'comments.targetUser': {
//      select: 'nickname avatar'
//    },
//    'labels': {
//      select: 'title type color display', match: { display: true }
//    }
//  }
//});


exports.commentModel = strategyCommentSchema;
exports.strategySchema = strategySchema;

var StrategyModel = mongoose.model('Strategy', strategySchema);

export default StrategyModel;
