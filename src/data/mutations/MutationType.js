import { GraphQLObjectType } from 'graphql';
import DeleteContactMutation from './DeleteContactMutation';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteContact: DeleteContactMutation,
  }
});

export default MutationType;
