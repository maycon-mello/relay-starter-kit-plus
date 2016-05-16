import { GraphQLObjectType, GraphQLString } from 'graphql';
import { nodeInterface, registerModelType } from '../NodeDefinitions';
import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
  globalIdField,
} from 'graphql-relay';

// Data
import getUser from '../api/getUser';
import { getContacts } from '../api/contact';
import User from '../model/User';

import { ContactConnectionType } from './ContactType';

/**
 * Define Type
 *
 */
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    contacts: {
      type: ContactConnectionType,
      description: 'Contacts collection',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getContacts(), args),
    },
  }),
  interfaces: [nodeInterface],
});

/**
 * Register Node Definitions
 *
 */
registerModelType({
  name: 'User',
  type: UserType,
  modelType: User,
  fetchById: (id) => getUser(id),
});


export default UserType;
