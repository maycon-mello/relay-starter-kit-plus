import Contact from '../model/Contact';
import User from '../model/User';

let contacts = [];

for (var i = 1; i <= 100; i++) {
  contacts.push(new Contact({
    id: i,
    name: `Contact ${i}`,
    age: parseInt(Math.random() * 60),
  }));
}

export default {
  users: [
    new User({
      id: 1,
      name: 'Maycon',
      contacts,
    })
  ],
}
