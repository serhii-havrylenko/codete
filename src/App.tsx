import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import React from 'react';
import { Router } from 'react-router';

import Routes from './components/Routes';
import stores from './stores';

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, stores.routing);

const App = () => (
  <Provider {...stores}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
);

export default App;
