import find from 'lodash.find';

const generateSearchValues = (searchFields) => {
    const searchValues = {};
    Object.assign({},searchFields.map((item) =>{
        searchValues[item.key] = item.type === 'select' ? find(item.options, (option)=>option.selected).value: item.value
    }));
    return searchValues;
};
export default {generateSearchValues};