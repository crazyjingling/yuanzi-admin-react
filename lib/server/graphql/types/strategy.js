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
import count from './count';
import {UserModel, LabelModel, CommentModel, PhotoModel} from '../../models';
import pluck from 'lodash.pluck';
import sumby from 'lodash.sumby';
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
					  type: GraphQLString,
					  resolve: (result) => result === 'done' ? result.recommendAt : '未推荐'
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
	  commentCount: {
		  type: GraphQLInt,
		  async resolve (schemaEntry, params, options) {
			  //todo: 这里的查询不能返回虚拟属性,不知道为啥,目前只能直接获取数组长度
			  return await CommentModel.count({strategy: schemaEntry._id}).exec();
		  }
	  },
	  commentReportCount: {
		  type: GraphQLInt,
		  async resolve (schemaEntry, params, options) {
			  //todo: 这里的查询不能返回虚拟属性,不知道为啥,目前只能直接获取数组长度
			  const reportUsers = await CommentModel.find({strategy: schemaEntry._id}).exec();
			  return sumby(pluck(reportUsers, 'reportUsers'), (item) => item.length);
		  }
	  },
	  photoCount: {type: GraphQLInt},
	  photoReportCount: {
		  type: GraphQLInt,
		  async resolve (schemaEntry, params, options) {
			  //todo: 这里的查询不能返回虚拟属性,不知道为啥,目前只能直接获取数组长度
			  return sumby(pluck(await PhotoModel.find({strategy: schemaEntry._id}).exec(), 'reportUsers'), (item) => item.length);
		  }
	  },
      updatedAt: {type: GraphQLString},
      createdAt: {type: GraphQLString}

  }
});

export default strategyType;
