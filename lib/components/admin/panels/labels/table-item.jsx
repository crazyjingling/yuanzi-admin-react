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
        let data = this.props.label;
        var field = data;
        const type = showField.type;

        if (showField.key.indexOf('.') !== -1) {
            const keys = showField.key.split('.');
            for (let i of keys) {
                field = field && field[i] || '无';
            }
        } else {
            field = typeof field[showField.key] === 'boolean' ? field[showField.key] : (field[showField.key] || '无');
        }
        if( showField.fieldsType &&  showField.fieldsType === 'array.object'){
            field = field.map((fieldItem)=>fieldItem[showField.showKey]).join(', ');
        }

        let inner;
        switch (type) {
            case 'avatar':
                inner = <Avatar avatar={field} userId={data.owner._id}/>;
                break;
            case 'image':
                inner = field !== '无' ? <img src={field} style={{ maxWidth: '40px' }} /> : <img style={{ maxWidth: '40px' }} />;
                break;
            case 'text':
                inner = field.toString();
                break;
            default:
                inner = field;
        }
        return <td style={{maxWidth: '100px', overflow: 'scroll'}} key={showField.key}>{inner}</td>;
    }
}
