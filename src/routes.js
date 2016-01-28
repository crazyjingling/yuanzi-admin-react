import React from 'react';
import { IndexRoute, Route, Router, Redirect, browserHistory } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Chat,
  Navigation,
  Widgets,
  About,
  Login,
  LoginSuccess,
  Survey,
  NotFound,
} from 'containers';
import {
  List,
  Test,
  Welcome
} from 'components';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };


  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route onEnter={requireLogin}>
          <Route path="/welcome" component={ Welcome }/>
          <Route path="/view/:name" component={List}/>
          <Route path="/activity" component={ Login }/>
          <Route path="*" component={NotFound} status={404}/>
        </Route>
        <Route path="/login" component={ Login }/>
      </Route>
    </Router>

  );
};
