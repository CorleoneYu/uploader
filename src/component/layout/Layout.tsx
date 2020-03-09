import React from 'react';
import { Router, Switch, Route, Redirect,  } from 'react-router-dom';
import history from '../../utils/history';

/* component */
import Main from '../main';
import Login from '../login-page';

function Layout() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/login" component={Login} />
        <Redirect from="*" to="/main" />
      </Switch>
    </Router>
  );
}
export default Layout;
