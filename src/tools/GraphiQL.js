import { graphql } from 'graphql';
import GraphiQL from 'graphiql';
import React from 'react';
import schema from '../data/schema';

const fetcher = (graphQL) => {
  return graphql(schema, graphQL.query, null, null, JSON.parse(graphQL.variables));
}
import '../../node_modules/graphiql/graphiql.css';

export default () => <GraphiQL fetcher={fetcher} schema={schema}/>
