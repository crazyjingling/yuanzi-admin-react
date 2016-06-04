/**
 * Created by matonghe on 16/6/1.
 */
import React, {PropTypes} from 'react';
import pluck from 'lodash.pluck';
import {Component} from 'relax-framework';
import moment from 'moment';
import Lightbox from '../../lightbox';
import Utils from '../../../helpers/utils';
export default class RefundStatus extends Component {
	render() {
		return (
			<div className="form-group"><label className="col-sm-2 control-label">Checkboxes &amp; radios <br/><small className="text-navy">Custom elements</small></label>
				<div className="col-sm-10">
					<div className="i-checks"><label> <input type="radio" value="option1" name="a"/> <i></i> Option one </label></div>
					<div className="i-checks"><label> <input type="radio" checked="" value="option2" name="a"/> <i></i> Option two checked </label></div>
					<div className="i-checks"><label> <input type="radio" disabled="" checked="" value="option2"/> <i></i> Option three checked and disabled </label></div>
					<div className="i-checks"><label> <input type="radio" disabled="" name="a"/> <i></i> Option four disabled </label></div>
				</div>
			</div>
	);
	}
}
