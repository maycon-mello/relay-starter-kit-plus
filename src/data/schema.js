
import { GraphQLSchema } from 'graphql';
import { types } from './NodeDefinitions';

import RootType from './types/RootType';
import MutationType from './mutations/MutationType';

export default new GraphQLSchema({
  query: RootType,
  mutation: MutationType,
  types,
});
