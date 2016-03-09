import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import topicType from '../../types/topic';
import topicInputType from '../../types/topic-input';
import {TopicModel} from '../../../models';

export default {
  type: topicType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(topicInputType)
    }
  },
  //resolve (root, params, options) {
  //  const {topicname, name, email, password} = params.data;
  //  const topic = new TopicModel({
  //    topicname,
  //    name,
  //    email
  //  });
  //
  //  return Q()
  //    .then(() => TopicModel.count().exec())
  //    .then((count) => {
  //      if (count > 0) {
  //        authorize(root);
  //      }
  //    })
  //    .then(() => Q.ninvoke(TopicModel, 'register', topic, password))
  //    .then(() => {
  //      return topic;
  //    });
  //}
  resolve (root, params, options) {
    authorize(root);

    const topic = new TopicModel(params.data);

    return Q()
        .then(() => topic.save())
        .then((newTopic) => {
          if (!newTopic) {
            throw new Error('Page not found');
          }
          return newTopic;
        });
  }
};
