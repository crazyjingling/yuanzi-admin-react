import {Types} from '../../../../data-types';

export default [
	{
		label: '标题',
		type: Types.String,
		id: 'title',
		props: {
			placeholder: '不超过10个汉字'
		}
	},
	{
		label: '分类',
		type: Types.Select,
		id: 'type',
		props: {
			values: ['cardTopicAssortment', 'userAssortment'],
			labels: ['妙招&话题标签', '达人标签']
		}
	},
	{
		label: '所属标签分类',
		type: Types.LabelPicker,
		id: 'ownedType',
		isAllShow: true
	},
	{
		label: '是否显示',
		type: Types.Select,
		id: 'display',
		props: {
			labels: ['不显示', '显示'],
			values: [false, true]
		}

	},
	{
		label: '颜色',
		type: Types.String,
		id: 'color'
	}
];
