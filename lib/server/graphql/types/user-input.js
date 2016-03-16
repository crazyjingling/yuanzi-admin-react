import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
	GraphQLList
} from 'graphql';

const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
	  _id: {type: GraphQLString},
	  nickname: {type: new GraphQLNonNull(GraphQLString)},
	  avatar: {type: new GraphQLInputObjectType({
		  name: 'avatarInputType',
		  fields: {
			  _id: {
				  type: GraphQLString
			  },
			  ossUrl: {
				  type: GraphQLString
			  }
		  }
	  })},
	  email: {type: GraphQLString},
	  position: {type: GraphQLString},
	  contactInfo: {type: GraphQLString},
	  account: {
		  type: new GraphQLInputObjectType({
			  name: 'accountAddInputType',
			  fields: {
				  username: {
					  type: GraphQLString
				  },
				  platform: {
					  type: GraphQLString
				  },
				  password: {
					  type: GraphQLString
				  }
			  }
		  })
	  },
	  baby: {
		  type: new GraphQLInputObjectType({
			  name: 'babyAddInputType',
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
	  labels: {
		  type: new GraphQLList(new GraphQLInputObjectType({
			  name: 'userLabelsAddInputType',
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
	  gender: {type: GraphQLString},
	  description: {type: GraphQLString}
  }
});

export default userInputType;
