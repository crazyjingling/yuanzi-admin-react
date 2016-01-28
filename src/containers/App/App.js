import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { Header, Footer } from 'components';
import { Navigation } from 'containers';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isInfoLoaded(getState())) {
    promises.push(dispatch(loadInfo()));
  }
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    error: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/welcome');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  render() {
    const { content, user } = this.props;
    return !this.props.error ? (
      <div>
        <Helmet {...config.app.head}/>
        <Header />
        {user && <div id="wrapper">
          <Navigation/>
          {/*<ContentPage>
            <Content>
              {this.props.children}
            </Content>
          </ContentPage>*/}
          <div id="page-wrapper" className="gray-bg dashbard-1">
            <div className="wrapper wrapper-content animated fadeIn">
              <div className="p-w-md m-t-sm">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ibox">
                      {this.props.children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
        {!user && this.props.children}
        <Footer />
      </div>
    ) : this.props.children;
  }
}
// {content ? <Home params={this.props.params}>{content}</Home> : this.props.children}