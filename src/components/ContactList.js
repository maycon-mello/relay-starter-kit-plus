import React from 'react';
import Relay from 'react-relay';

class ContactList extends React.Component {
  render() {
    let contacts = this.props.viewer.contacts;

    return (
      <div>
        <h1>Contact list</h1>
        <ul>

          {contacts.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(ContactList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        contacts(first: 10) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});
