import React, { Component } from 'react';
import Relay from 'react-relay';

class ListItem extends Component {

  remove = () => {
    this.props.onRemove(this.props.contact);
  }

  edit = () => {
    this.props.onEdit(this.props.contact);
  }

  render() {
    const {id, name, age} = this.props.contact;
    return (
      <tr>
        <td>{ name }</td>
        <td>{ age }</td>
        <td>
          <button onClick={this.remove}>Remove</button>
          <button onClick={this.edit}>Edit</button>
        </td>
      </tr>
    );
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
});
