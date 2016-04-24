import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLBoolean
} from 'graphql';
import {LabelModel, MediaModel} from '../../models';
import ownedType from './label-owned';

const labelType = new GraphQLObjectType({
	name: 'Label',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		title: {type: new GraphQLNonNull(GraphQLString)},
		type: {type: GraphQLString},
		cover: {type: GraphQLString},
		//cover: {type: new GraphQLObjectType({
		//	name: 'coverLabelCover',
		//	fields: {
		//		_id: {
		//			type: GraphQLString,
		//			resolve: (media, params, options) => media._id || ''
        //
		//		},
		//		ossUrl: {
		//			type: GraphQLString,
		//			resolve: (media, params, options) => media.ossUrl || ''
        //
		//		}
		//	}
		//}),
		//	async resolve (schemaEntry, params, options) {
		//		const media = await MediaModel.findOne({ossUrl: schemaEntry.cover}).select({_id: 1, ossUrl: 1}).exec();
		//		return {_id: media ? media._id : '', ossUrl: schemaEntry.cover};
		//	}},
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
