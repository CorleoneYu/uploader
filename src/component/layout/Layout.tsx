import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
// import history from '../../utils/history';

/* component */
import Main from '../main';
import Login from '../login-page';

import { Provider } from 'mobx-react';
import { UserInfoStore } from '../../store';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routerStore);

const rootStore = {
  userInfo: new UserInfoStore(),
  router: routerStore,
};

const Layout: React.FC = () => {
  return (
    <Provider {...rootStore}>
      <Router history={history}>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/main" />
        </Switch>
      </Router>
    </Provider>
  );
}
export default Layout;
