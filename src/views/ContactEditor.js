import React from 'react';
import { Route } from 'react-router';
import ContactEditor from '../components/ContactEditor';

export const PATH = '/edit';

function prepareParams(params, { location }) {
  let { contactId } = location.query;
  return {
    ...params,
    contactId,
  };
};


export function getRoute(Queries) {
  return (
    <Route
      path={PATH}
      component={ContactEditor}
      queries={Queries}
      queryParams={['contactId']}
      prepareParams={prepareParams}
    />
  );
}
