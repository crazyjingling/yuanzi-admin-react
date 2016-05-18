import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';
import labelInputType from './label-input';
const strategyInputType = new GraphQLInputObjectType({
	name: 'StrategyInput',
	fields: {
		_id: {type: GraphQLString},
		title: {type: new GraphQLNonNull(GraphQLString)},
		subTitle: {type: GraphQLString},
		labels: {
			type: new GraphQLList(labelInputType)
		},
		type: {type: GraphQLString},
		scope: {type: GraphQLString},
		owner: {
			type: new GraphQLInputObjectType({
				name: 'ownerStrategyInputType',
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
		cover: {
			type: new GraphQLInputObjectType({
				name: 'coverStrategyInputType',
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
		materials: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'materialsStrategyInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					},
					amount: {
						type: GraphQLString
					}
				}
			}))
		},
		tools: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'toolsStrategyInputType',
				fields: {
					_id: {
						type: GraphQLString
					},
					title: {
						type: GraphQLString
					},
					amount: {
						type: GraphQLString
					}
				}
			}))
		},
		steps: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'stepsStrategyInputType',
				fields: {
					imgUrl: {
						type: new GraphQLInputObjectType({
							name: 'stepsImgUrlInputType',
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
					description: {
						type: GraphQLString
					}
				}
			}))
		},
		degree: {type: GraphQLInt},
		consumingTime: {type: GraphQLInt},
		soundStory: {type: GraphQLString},
		soundStoryLength: {type: GraphQLInt}
	}
});

export default strategyInputType;
