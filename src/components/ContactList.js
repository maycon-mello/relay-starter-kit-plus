import React from 'react';
import Relay from 'react-relay';
import ListItem from './ListItem';

class ContactList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  onClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    let { contacts } = this.props.viewer;
    const items = contacts.edges.map(({node}) => <ListItem contact={node}/>);
    return (
      <div>
        <h1 style={{color: 'blue'}}>Tesss</h1>
        <button onClick={this.onClick}>{this.state.count} clicks</button>
        <ul> {items} </ul>
      </div>
    );
  }
}

export default Relay.createContainer(ContactList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        contacts(first: 3) {
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
