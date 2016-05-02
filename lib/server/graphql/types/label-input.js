import {
	GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';
import {LabelModel, MediaModel} from '../../models';

const labelInputType = new GraphQLInputObjectType({
  name: 'LabelInput',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
	  type: {type: GraphQLString},
    	ownedType: {type: new GraphQLInputObjectType({
		name: 'ownedTypeInput',
		fields: {
			_id: {type: GraphQLString},
			title: {type: GraphQLString}
		}
	})},
  cover: {
	  type: new GraphQLInputObjectType({
		  name: 'coverLabelInputType',
		  fields: {
			  _id: {
				  type: GraphQLString
			  },
			  ossUrl: {
				  type: GraphQLString
			  }
		  }
	  })
  },
	  display: {type: GraphQLString},
	  color: {type: GraphQLString},
	  searchNum: {type: GraphQLString},
	  createdAt: {type: GraphQLString},
	  updatedAt: {type: GraphQLString}
  }
});

export default labelInputType;
