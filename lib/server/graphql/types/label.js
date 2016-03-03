import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLBoolean
} from 'graphql';
import {LabelModel} from '../../models';
import ownedType from './label-owned';

const labelType = new GraphQLObjectType({
	name: 'Label',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		title: {type: new GraphQLNonNull(GraphQLString)},
		type: {type: GraphQLString},
		cover: {type: GraphQLString},
		display: {type: GraphQLString},
		ownedType: {
			type: ownedType,
			async resolve (schemaEntry, params, options) {
				const ownedTypeLabel = await LabelModel.findOne({labels: schemaEntry._id}).exec();
				return ownedTypeLabel;
			}
		},
		color: {type: GraphQLString},
		searchNum: {type: GraphQLString},
		createdAt: {type: GraphQLString},
		updatedAt: {type: GraphQLString}
	}
});

export default labelType;
