import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { nodeInterface, registerModelType } from '../NodeDefinitions';
import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
  globalIdField,
  fromGlobalId,
} from 'graphql-relay';

// Data
import getUser from '../api/getUser';
import { getContacts, getContact } from '../api/contact';
import User from '../model/User';

import ContactType, { ContactConnectionType } from './ContactType';

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
    contact: {
      type: ContactType,
      description: 'Get contact',
      args: {
        contactId: {
          type: GraphQLID
        }
      },
      resolve: (_, args) => {
        let contactId = fromGlobalId(args.contactId).id;

        console.log(contactId);
        return getContact(contactId);
      }
    }
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
