import React from 'react';
import { Router, Switch, Route, Redirect,  } from 'react-router-dom';
import history from '../../utils/history';

/* component */
import Main from '../main';
import Login from '../login-page';
import Pieces from '../pieces';

function Layout() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/pieces" component={Pieces} />
        <Redirect from="*" to="/main" />
      </Switch>
    </Router>
  );
}
export default Layout;
