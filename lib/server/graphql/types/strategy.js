import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import labelType from './label';
import commentReportType from './comment-report';
import count from './count';
import {UserModel, LabelModel, CommentModel, PhotoModel} from '../../models';
import pluck from 'lodash.pluck';
import groupBy from 'lodash.groupBy';
import sumby from 'lodash.sumby';
import countBy from 'lodash.countby';
import Utils from '../../../helpers/utils';

const strategyType = new GraphQLObjectType({
  name: 'Strategy',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      title: {type: new GraphQLNonNull(GraphQLString)},
      cover: {type: GraphQLString},
      owner: {
        type: userType,
        async resolve (schemaEntry, params, options) {
          return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
        }
      },
      labels: {
        type: new GraphQLList(labelType),
        async resolve (schemaEntry, params, options) {
          return schemaEntry.labels.length && await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec();
        }
      },
      isRecommended: {
		  type: new GraphQLObjectType({
			  name: 'isRecommendedType',
			  fields: {
				  stateType: {
					  type: GraphQLString
				  },
				  recommendAt: {
					  type: GraphQLString
				  }
			  }
	  })},
      strategyNo: {type: GraphQLString},
	  artificialCount: {type: GraphQLInt},
	  artificialdata: {
		  type: new GraphQLObjectType({
			  name: 'artificialdataType',
			  fields: {
				  artificialtrycount: {
					  type: GraphQLInt
				  }
		  		}
		  })
	  },
      playCount: {type: GraphQLInt},
      sharedCount: {type: GraphQLInt},
      collectCount: {type: GraphQLInt},
	  reportUsers: {type: new GraphQLList(new GraphQLObjectType({
		  name: 'reportUsers',
		  fields: {
			  user: {type: GraphQLString},
			  reason: {type: GraphQLString}
		  }
	  }))},
	  reportRelated: {
		  type: new GraphQLObjectType({
			  name: 'ReportType',
			  fields: {
				  reportCount: {
					  type: GraphQLInt,
					  resolve: (reportRelated, params, options) => reportRelated.reportCount
				  },
				  reportInfo: {
					  type: GraphQLString,
					  resolve: (reportRelated, params, options) => JSON.stringify({reportReasonCount: Utils.resolveReportReason(reportRelated.reportUsers)})
				  }
			  }
		  }),
		  resolve: (schemaEntry, params, options) => schemaEntry
	  },
	  commentCount: {
		  type: GraphQLInt,
		  async resolve (schemaEntry, params, options) {
			  return await CommentModel.count({strategy: schemaEntry._id}).exec();
		  }
	  },
	  commentReportRelated: {
		  type: new GraphQLObjectType({
			  name: 'commentReportType',
			  fields: {
				  commentReportCount: {
					  type: GraphQLInt,
					  resolve: (commentReportRelated, params, options) => {
						  let results = [];
						  pluck(commentReportRelated, 'reportUsers').forEach(function (item) {
							  results = results.concat(item);
						  });
						  return results.length;
					  }
				  },
				  commentReportInfo: {
					  type: GraphQLString,
					  async resolve (commentReportRelated, params, options) {
						  return JSON.stringify({comments: commentReportRelated});
					  }
				  }
			  }
		  }),
		  async resolve (schemaEntry, params, options) {
			  return await CommentModel.find({strategy: schemaEntry._id, reportUsers: {'$not':{'$size': 0}}})
				  .select({
					  _id: 1,
					  content: 1,
					  reportUsers: 1
				  })
				  .exec();
		  }
	  },
	  photoCount: {type: GraphQLInt},
	  photoReportRelated: {
		  type: new GraphQLObjectType({
			  name: 'photoReportType',
			  fields: {
				  photoReportCount: {
					  type: GraphQLInt,
					  resolve: (photoReportRelated, params, options) => {
						  let results = [];
						  pluck(photoReportRelated, 'reportUsers').forEach(function (item) {
							  results = results.concat(item);
						  });
						  return results.length;
					  }
				  },
				  photoReportInfo: {
					  type: GraphQLString,
					  //todo: 等 graphql 的 GraphQLRawObjectType 可以用了,就将这个类型替换
					  resolve: (photoReportInfo, params, options) => JSON.stringify({photos: photoReportInfo})
				  }
			  }
		  }),
		  async resolve (schemaEntry, params, options) {
			  return await PhotoModel.find({strategy: schemaEntry._id, reportUsers: {'$not':{'$size': 0}}})
				  .populate({
					  path: 'owner', select: 'nickname avatar'
				  })
				  .exec()
		  }
	  },
      updatedAt: {type: GraphQLString},
      createdAt: {type: GraphQLString}

  }
});

export default strategyType;
