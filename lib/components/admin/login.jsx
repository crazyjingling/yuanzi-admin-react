import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Login extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		fieldChange: PropTypes.func.isRequired,
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		error: PropTypes.string
	}

	onChange (id, event) {
		this.props.fieldChange(id, event.target.value);
	}
	onSubmit(event){
		event.preventDefault();
		this.props.onSubmit();
	}
	render () {
		return (
			<div className="middle-box text-center loginscreen animated fadeInDown">
				<div>
					<div>
						<img src='/img/logo-100.png' width='150' style={{borderRadius:'10px'}}/>
					</div>
					<h3>Welcome to 元子育儿</h3>
					<p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.</p>
					<p>Login in. To see it in action.</p>
					<form className="m-t" role="form" onSubmit={this.onSubmit.bind(this)}>
						<div className="form-group">
							<input type='text' name='username' className="form-control" required="" placeholder='Username' value={this.props.username} onChange={this.onChange.bind(this, 'username')} />
						</div>
						<div className="form-group">
							<input type='password' name='password' className="form-control" placeholder='Password' required="" value={this.props.password} onChange={this.onChange.bind(this, 'password')} />
						</div>
						<button type="submit" className="btn btn-primary block full-width m-b" onClick={this.props.onSubmit}>Login</button>
						{<div className='error'>{this.props.error && this.props.error || ' '}</div>}
						<input type='submit' hidden />
					</form>
				</div>
			</div>
	);
	}
}
