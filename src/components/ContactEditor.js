import React, { Component } from 'react';
import Relay from 'react-relay';


class ContactEditor extends Component {


  render() {
    const { contact } = this.props.viewer;

    return (
      <div>
        Contact Editor
      </div>
    )
  }
}

export default Relay.createContainer(ContactEditor, {
  initialVariables: {
    contactId: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        contact($contactId) {
          id
          name
          age
        }
      }
    `,
  }
});
