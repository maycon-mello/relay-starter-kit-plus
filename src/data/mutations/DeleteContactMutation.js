import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import { deleteContact } from '../api/contact';
import ViewerType from '../types/ViewerType';

const DeleteContactMutation = mutationWithClientMutationId({
  name: 'DeleteContact',
  inputFields: {
    deletedContactID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    deletedContactID: {
      type: GraphQLID,
      resolve: (payload) => {
        return payload.deletedContactID;
      },
    },
    viewer: {
      type: ViewerType,
      resolve: (payload) => {
        return payload.viewer;
      },
    },
  },
  mutateAndGetPayload: ({ deletedContactID }) => {
    let { id } = fromGlobalId(deletedContactID);
    return deleteContact(id).then(payload => ({
      ...payload,
      deletedContactID,
    }));
  },
});

export default DeleteContactMutation;
