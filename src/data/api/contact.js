import data from './_data';

export const getContacts = (userId=0) => {
  return data.users[userId].contacts;
}

export const getContact = (contactId, userId=0) => {
  return data.users[userId].contacts[contactId];
}
