import React, { Component } from 'react';
import Relay from 'react-relay';

class ListItem extends Component {

  render() {
    const {id, name, age} = this.props.contact;
    return <div>{ id } - { name } / { age }</div>
  }
}

export default Relay.createContainer(ListItem, {
  fragments: {
    contact: () => Relay.QL`
      fragment on Contact {
        id,
        name,
        age
      }
    `,
  },
})
