import React from 'react';
import Relay from 'react-relay';
import ListItem from './ListItem';
import DeleteContactMutation from '../mutations/DeleteContactMutation';

class ContactList extends React.Component {

  constructor(props) {
    super(props);
  }

  remove = (contact) => {
    let { viewer } = this.props;
    let mutation = new DeleteContactMutation({ contact, viewer });
    Relay.Store.commitUpdate(mutation);
  }

  edit = (contact) => {
    this.context.router.push({
      pathname: '/edit',
      query: { contactId: contact.id },
    });
  }

  loadMore = () => {
    this.context.router.push({
      pathname: '/',
      query: {
        ...this.props.location.query,
        size: this.props.size + 5,
      },
    });
  }

  render() {
    let { contacts } = this.props.viewer;
    const items = contacts.edges.map(({node}, idx) =>
      <ListItem
        key={idx}
        contact={node}
        onRemove={this.remove}
        onEdit={this.edit}
      />
    );

    return (
      <div>
        <h1 style={{color: '#F20', padding: '10px 0'}}>Contact List</h1>
        <input type="text" placeholder="Search"/>
        <table>
          <thead>
            <tr>
              <th>Names</th><th>Age</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
        <button onClick={this.loadMore}>Load more</button>
      </div>
    );
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
}

export default Relay.createContainer(ContactList, {
  initialVariables: {
    size: 5,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${DeleteContactMutation.getFragment('viewer')}
        contacts(first: $size) {
          edges {
            node {
              ${ListItem.getFragment('contact')}
            },
          },
        },
      }
    `,
  },
});
