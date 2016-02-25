import {Types} from '../../../../data-types';

export default [
  {
    label: '标题',
    type: Types.String,
    id: 'title',
    default: ''
  },
  {
    label: '分类',
    type: Types.LabelPicker,
    id: 'type'
  },
	{
		label: '所属标签分类',
		type: Types.LabelPicker,
		id: 'ownedType'
	},
	{
		label: '是否显示',
		type: Types.LabelPicker,
		id: 'display'
	},
  {
    label: '颜色',
    type: Types.String,
    id: 'color'
  }
];
