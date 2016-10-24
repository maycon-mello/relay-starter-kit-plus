import React from 'react';
import { Route } from 'react-router';
import ContactList from '../components/ContactList';

export const PATH = '/';

function prepareParams(params, { location }) {
  let { color, size } = location.query;

  size = size || 10;

  return {
    ...params,
    size: parseInt(size),
  };
};


export function getRoute(Queries) {
  return (
    <Route
      path={PATH}
      component={ContactList}
      queries={Queries}
      queryParams={['size']}
      prepareParams={prepareParams}
    />
  );
}
