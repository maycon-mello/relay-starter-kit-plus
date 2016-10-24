import Relay from 'react-relay';

export default class DeleteContactMutation extends Relay.Mutation {

  /**
   * Returns the name of the Mutation in
   * the application Schema
   *
   * @returns {*}
   */
  getMutation() {
    return Relay.QL`mutation{ deleteContact }`;
  }

  // This is actually used in the inputFields from Schema!
  getVariables() {
    return {
      deletedContactID: this.props.contact.id,
    };
  }

  /**
   * Query that lists all the fields that
   * have to be updated after the mutation occurs
   *
   * @returns {*}
   */
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteContactPayload {
        viewer {
          contacts(first: 10) {
            edges {
              node {
                id
                name
                age
              }
            }
          }
        },
        deletedContactID,
      }
    `;
  }

  /**
   * Configures the mutation for
   * adding a comment into an Order
   *
   * @returns {*[]}
   */
  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'contacts',
        deletedIDFieldName: 'deletedContactID',
      },
    ];
  }

  getOptimisticResponse() {
    const deletedContactID = this.props.contact.id;
    const deleteFilter = ({node}) =>  node.id != deletedContactID;
    return {
      viewer: {
        id: this.props.viewer.id,
        contacts: {
          edges: this.props.viewer.contacts.edges.filter(deleteFilter)
        }
      }
    };
  }
}

/**
 * Fragment that holds all necessary data to
 * execute Mutation
 *
 */
DeleteContactMutation.fragments = {
  viewer: () => Relay.QL`
    fragment on User {
      id
      contacts(first: 10) {
        edges {
          node {
            id
            name
            age
          }
        }
      }
    }
  `,
};
