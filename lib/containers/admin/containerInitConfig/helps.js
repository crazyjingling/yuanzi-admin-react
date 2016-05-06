import find from 'lodash.find';

const generateSearchValues = (searchFields) => {
    const searchValues = {};
    Object.assign({},searchFields.map((item) =>{
        searchValues[item.key] = {
            value: item.type === 'select' ? find(item.options, (option)=>option.selected).value : item.value,
            type: item.type
        }
    }));
    return searchValues;
};
export default {generateSearchValues};
