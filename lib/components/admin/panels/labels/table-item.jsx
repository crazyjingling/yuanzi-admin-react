import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import A from '../../../a';
import Lightbox from '../../../lightbox';
import Utils from '../../../../helpers/utils';
import labelFragments from './fragments';
export default class TableItem extends Component {
    static fragments = labelFragments;

    static propTypes = {
        label: PropTypes.object,
        removeLabel: PropTypes.func.isRequired,
        showFields: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired
    }

    getInitState () {
        return {
            removing: false
        };
    }

    onRemove (event) {
        event.preventDefault();
        this.setState({
            removing: true
        });
    }

    render() {
        return (
            <tr>
                {this.props.showFields.map(this.renderItem, this)}
            </tr>
        );
    }

    renderItem (showField) {
        const data = this.props.label;
        let field = data;
        const type = showField.type;

        if (showField.key.indexOf('.') !== -1) {
            const keys = showField.key.split('.');
            for (let i of keys) {
                field = field && field[i] || '无';
            }
        } else {
            field = field[showField.key];
        }
        if( showField.fieldsType &&  showField.fieldsType === 'array.object'){
            field = field.map((fieldItem)=>fieldItem[showField.showKey]).join(', ');
        }
        if(showField.key === 'labels'){
            console.log('=================================field', field);

        }
        let inner;
        switch (type) {
            case 'avatar':
                inner = <Avatar avatar={field} userId={data.owner._id}/>;
                break;
            case 'image':
                inner = <img src={field} style={{ maxWidth: '40px' }} />;
                break;
            default:
                inner = field;
        }
        return <td style={{maxWidth: '100px', overflow: 'scroll'}} key={showField.key}>{inner}</td>;
    }
}
