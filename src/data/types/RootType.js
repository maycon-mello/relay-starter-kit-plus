import { GraphQLObjectType } from 'graphql';
import getViewer from '../api/getViewer';
import { nodeField } from '../NodeDefinitions';
import { ContactConnection } from './ContactType';

import ViewerType from './ViewerType';

var RootType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: ViewerType,
      resolve: () => getViewer(),
    },
  }),
});


export default RootType;
