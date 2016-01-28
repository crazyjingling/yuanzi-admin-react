import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.login(username.value, password.value);
  }

  render() {
    return (

      <div className="middle-box text-center loginscreen animated fadeInDown">
        <Helmet title="Login"/>
        <div>
          <div className="m-t-xl">
            <h2>元子育儿管理后台</h2>
          </div>
          <form style={{ marginTop: '140px' }} role="form">
            <div className="form-group">
              <input ref="username" name="username" type="text" className="form-control" placeholder="Username" required=""/>
            </div>
            <div className="form-group">
              <input ref="password" name="password" type="password" className="form-control" placeholder="Password" required=""/>
            </div>
            <button type="submit" className="btn btn-primary block full-width m-b" onClick={this.handleSubmit}>Login</button>

          </form>

        </div>
      </div>
    );
  }

}
