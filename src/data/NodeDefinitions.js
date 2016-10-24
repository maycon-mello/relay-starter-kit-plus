import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

let idFetchers = [];
let typeResolvers = [];

/**
 * Fetch data with globalId
 *
 */
const fetchDataById = (globalId) => {
  const { type, id } = fromGlobalId(globalId);

  for (let fetcher of idFetchers) {
    if (type === fetcher.type) {
      return fetcher.resolve(id);
    }
  }

  console.log("unable to fetch data by id", idFetchers, type, id)
  return null;
}

/**
 *
 *
 */
const resolveType = (obj) => {
  for (let typeResolver of typeResolvers) {
    if (typeResolver.check(obj)) {
      return typeResolver.resolve(obj);
    }
  }
  console.log("unable to resolve type", obj, typeResolvers)
  return null;
}

/**
 *
 *
 */
export const registerType = ({idFetcher, typeResolver, type}) => {
  idFetchers.push(idFetcher);
  typeResolvers.push(typeResolver);
  types.push(type);
}

export const registerModelType = ({name, type, modelType, fetchById}) => {
  idFetchers.push({
    type: 'Contact',
    resolve: fetchById,
  });
  typeResolvers.push({
    check: (obj) => obj instanceof modelType,
    resolve: () => type,
  });
  types.push(type);
}

export const types = [];

export const {
  nodeField,
  nodeInterface,
} = nodeDefinitions(fetchDataById, resolveType);
