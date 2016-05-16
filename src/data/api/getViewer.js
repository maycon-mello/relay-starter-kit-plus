import data from './_data';

export default () => {
  let {id, name} = data.users[0];
  return {id, name};
}
