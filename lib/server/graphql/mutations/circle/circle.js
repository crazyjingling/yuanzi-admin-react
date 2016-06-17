/**
 * Created by matonghe on 16/6/14.
 */
import {
	GraphQLNonNull,
	GraphQLString
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import circleType from '../../types/circle';
import circleInputType from '../../types/circle-input';
import {CircleModel} from '../../../models';
import getProjection from 'relax-framework';

exports.addCircle = {
	type: circleType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(circleInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		if(params.data.cover){
			params.data.cover = params.data.cover.ossUrl;
		}
		console.log(params);
		const circle = new CircleModel(params.data);
		console.log(params);
		return Q()
			.then(() => circle.save())
			.then((newCircle) => {
				if (!newCircle) {
					throw new Error('Page not found');
				}
				return newCircle;
			});
	}
};

exports.updateCircle = {
	type: circleType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(circleInputType)
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		params.data.cover = params.data.cover.ossUrl;
		const projection = getProjection(options.fieldASTs[0]);
		const circle = await CircleModel.findById(params.data._id);
		const circleChanges = Object.assign({}, circle._doc, {
			...params.data,
			//__v: circle.__v + 1,
			updatedAt: new Date()
		});
		const resultCircle = await CircleModel.findByIdAndUpdate(
			params.data._id,
			circleChanges,
			{upsert: true, new: true}).select(projection).exec();
		console.log('=================================update resultCircle', resultCircle);
		if (!resultCircle) {
			throw new Error('Error updating circle');
		}
		return resultCircle;
	}
};

exports.removeCircle = {
	type: circleType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		return CircleModel
			.findByIdAndUpdate(params.data, {'isDel': true}, {upsert: true, new: true})
			.exec()
			.then((removedCircle) => {
				if (!removedCircle) {
					throw new Error('user not found');
				}
				return removedCircle;
			});
	}
};
