/**
 * Created by matonghe on 16/5/4.
 */
import {
	GraphQLList,
	GraphQLID
} from 'graphql';
import Q from 'q';
import {getProjection} from 'relax-framework';
import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import orderType from '../../types/order';
import orderInputType from '../../types/order-input';
import {OrderModel} from '../../../models';

exports.addOrder = {
	type: orderType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(orderInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		const order = new OrderModel(params.data);
		return Q()
			.then(() => order.save())
			.then((newOrder) => {
				if (!newOrder) {
					throw new Error('Page not found');
				}
				return newOrder;
			});
	}
};

exports.updateOrder = {
	type: orderType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(orderInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		const projection = getProjection(options.fieldASTs[0]);
		return Q()
			.then(()=>OrderModel.findById(params.data._id))
			.then((order)=>{
				const orderChanges = Object.assign({}, order._doc, {
					...params.data,
					__v: order.__v + 1,
					updatedAt: new Date()
				});
				return Q().then(OrderModel.findByIdAndUpdate(
					params.data._id,
					orderChanges,
					{upsert: true, new: true}).select(projection).exec()).then((updateOrder) => {
					if (!updateOrder) {
						throw new Error('Page not found');
					}
					return updateOrder;
				});
			})

	}
};
