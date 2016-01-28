/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './LoginPage.scss';
import withStyles from '../../decorators/withStyles';
import LoginStore from '../../stores/LoginStore';
import LoginActions from '../../actions/LoginActions';

const title = 'Log In';

@withStyles(s)
class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,

  };
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.context.onSetTitle(title);
  }
  componentDidMount() {
    LoginStore.listen(this.onChange);
  }
  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.state.username.trim();
    const password = this.state.password.trim();

    if (username) {
      LoginActions.login({
        username: username,
        password: password
      });
    }
  }

  render() {
    return (

      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div className="m-t-xl">
            <h2>元子育儿管理后台</h2>
          </div>
          <form className={s.marginTop} role="form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input name="username" type="text" className="form-control" placeholder="Username" required="" value={this.state.username} onChange={LoginActions.updateUsername} />
            </div>
            <div className="form-group">
              <input name="password" type="password" className="form-control" placeholder="Password" required="" value={this.state.password} onChange={LoginActions.updatePassword} />
            </div>
            <button type="submit" className="btn btn-primary block full-width m-b" onClick={this.handleSubmit.bind(this)}>Login</button>

          </form>

        </div>
      </div>
    );
  }

}

export default LoginPage;
