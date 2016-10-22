import React from 'react';
import Relay from 'react-relay';
import {IndexRoute, Route, Router, browserHistory, applyRouterMiddleware} from 'react-router';

import RelayLocalSchema from 'relay-local-schema';
import schema from './data/schema';

const layer = new RelayLocalSchema.NetworkLayer({schema});
Relay.injectNetworkLayer(layer);

import RelayRouter from 'react-router-relay';
import AppHomeRoute from './routes/HomeRouter';

// Components
import ContactList from './components/ContactList';

export const app = <Relay.RootContainer
  Component={ContactList}
  route={new AppHomeRoute()}
/>
