import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface, registerModelType } from '../NodeDefinitions';

import Contact from '../model/Contact';
import { getContact } from '../api/contact';

/**
 * Define Type
 *
 */
const ContactType = new GraphQLObjectType({
  name: 'Contact',
  fields: () => ({
    id: globalIdField('Contact'),
    name: { type: GraphQLString },
    age: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
});


const connection = connectionDefinitions({
  name: 'Contact',
  nodeType: ContactType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      resolve: (conn) => conn.edges.length,
    },
  }),
});

/**
 * Register Node Definitions
 *
 */
registerModelType({
  name: 'Contact',
  type: ContactType,
  modelType: Contact,
  fetchById: (id) => {
    return getContact(id)
  },
});

export default ContactType;
export const ContactConnectionType = connection.connectionType;
export const ContactEdgeType = connection.edgeType;
