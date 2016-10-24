import data from './_data';

export const getContacts = (userId=0) => {
  return data.users[0].contacts;
}

export const getContact = (contactId, userId=0) => {
  return data.users[0].contacts[contactId - 1];
}

export const deleteContact = (contactId) => {
  let user = data.users[0];
  return new Promise((resolve, reject) => {
    try {
      user.contacts = user.contacts.filter(({id}) => id != contactId);
      let result = { viewer: user };

      // Simulate server delay
      setTimeout(() => resolve(result), 500);
    } catch(ex) {
      console.log(ex);
      reject(ex);
    }
  });
}
