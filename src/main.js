import React from 'react';
import Relay from 'react-relay';
import {IndexRoute, Route, Router, browserHistory, applyRouterMiddleware} from 'react-router';
import {render} from 'react-dom';

import RelayLocalSchema from 'relay-local-schema';
import schema from './data/schema';

Relay.injectNetworkLayer(
  new RelayLocalSchema.NetworkLayer({schema})
);

import RelayRouter from 'react-router-relay';
import AppHomeRoute from './routes/HomeRouter';

// Components
import ContactList from './components/ContactList';

render(
  <Relay.RootContainer
    Component={ContactList}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
