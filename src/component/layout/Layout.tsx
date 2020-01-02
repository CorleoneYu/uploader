import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

/* component */
import Main from '../main';
import Login from '../login-page';

export default class extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/main" />
        </Switch>
      </BrowserRouter>
    );
  }
}
