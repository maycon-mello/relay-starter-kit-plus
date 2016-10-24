import React from 'react';
import Relay from 'react-relay';
import {
  Route,
  Router,
  hashHistory,
  applyRouterMiddleware
} from 'react-router';
import RelayRouter from 'react-router-relay';
import RelayLocalSchema from 'relay-local-schema';

import schema from './data/schema';

Relay.injectNetworkLayer(new RelayLocalSchema.NetworkLayer({ schema }));

import AppHomeRoute from './routes/HomeRouter';

// Components
import * as ContactListView from './views/ContactList';
import GraphiQL from './tools/GraphiQL';
//

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`
};

import './style.css';

// const renderFailure = () => <div>Error</div>;

// export const app = <Relay.RootContainer
//   Component={ContactList}
//   route={new AppHomeRoute()}
// />
//console.log(ContactListView);

const routes = [
  ContactListView.getRoute(ViewerQueries),
  <Route
    path="/graphiql"
    component={GraphiQL}
  />
];

export const app = (
  <Router
    history={hashHistory}
    render={applyRouterMiddleware(RelayRouter)}
    environment={Relay.Store}
    routes={routes}
    key={Date.now()}
  />
);
