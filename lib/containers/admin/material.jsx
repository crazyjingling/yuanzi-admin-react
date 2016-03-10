import * as dndActions from '../../client/actions/dnd';
import * as materialActions from '../../client/actions/material';

import cloneDeep from 'lodash.clonedeep';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import Material from '../../components/admin/panels/material';
@connect(
	(state) => ({
		material: state.material.data,
		errors: state.material.errors,
	}),
	(dispatch) => ({
		...bindActionCreators(materialActions, dispatch),
	})
)
export default class MaterialContainer extends Component {
	static fragments = Material.fragments;

	static panelSettings = {
		activePanelType: 'material',
		breadcrumbs: [
			{
				link: '/admin/materials'
			}
		]
	}

	static propTypes = {
		material: PropTypes.object,
		errors: PropTypes.any,
		breadcrumbs: PropTypes.array,
		slug: PropTypes.string,
		changeMaterialToDefault: PropTypes.func,
		changeMaterialValue: PropTypes.func.isRequired,
		addMaterial: PropTypes.func,
		updateMaterial: PropTypes.func,
		history: PropTypes.object.isRequired
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.slug !== 'new' && nextProps.slug === 'new') {
			this.props.changeMaterialToDefault();
		}
	}

	componentWillUnmount () {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}
	}

	async onSubmit (materialProps) {
		if (this.successTimeout) {
			clearTimeout(this.successTimeout);
		}

		const submitMaterial = cloneDeep(materialProps);

		let action;
		const isNew = this.isNew();

		if (isNew) {
			action = ::this.props.addMaterial;
		} else {
			action = ::this.props.updateMaterial;
		}

		let hasErrors = false;
		let resultMaterial;
		try {
			resultMaterial = await action(this.constructor.fragments, submitMaterial);
		} catch (ex) {
			hasErrors = true;
			console.error(ex);
		}

		if (hasErrors === false) {
			this.setState({
				saving: false,
				success: true,
				error: false,
				new: false
			});
			if (isNew) {
				this.props.history.pushState({}, `/admin/materials/${resultMaterial._id}`);
			}
			this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
		} else {
			this.setState({
				saving: false,
				error: true
			});
		}
	}

	onSuccessOut () {
		clearTimeout(this.successTimeout);

		const dom = findDOMNode(this.refs.material.refs.success);
		if (dom) {
			const transition = 'transition.slideDownOut';
			Velocity(dom, transition, {
				duration: 400,
				display: null
			}).then(() => {
				this.setState({
					success: false
				});
			});
		}
	}

	onUpdate () {
		this.setState({
			saving: true,
			savingLabel: 'Updating material'
		});

		this.onSubmit(this.props.material);
	}

	onCreate () {
		this.setState({
			saving: true,
			savingLabel: 'Creating material'
		});

		this.onSubmit(cloneDeep(this.props.material));
	}

	onChange (id, value) {
		this.props.changeMaterialValue(id, value);
	}

	async validateSlug (slug) {
		const materialId = this.props.material._id;
		return await this.props.validateMaterialSlug({slug, materialId});
	}

	isNew () {
		return !this.props.material._id;
	}

	render () {
		return (
			<Material
				ref='material'
				{...this.props}
				{...this.state}
				errors={this.props.errors}
				isNew={this.isNew()}
				onChange={::this.onChange}
				onCreate={::this.onCreate}
				onUpdate={::this.onUpdate}
				validateSlug={::this.validateSlug}
			/>
		);
	}
}
