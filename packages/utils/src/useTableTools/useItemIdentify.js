const getIdProp = (item, idProp = 'id') => item[idProp];

const identify = (item, identifier) => {
  if (typeof identifier === 'string') {
    return {
      ...item,
      itemId: getIdProp(item, identifier),
    };
  } else {
    return {
      ...item,
      itemId: identifier(item),
    };
  }
};

// TODO Rethink how items are identified
// this hook is meant to give items in the table a reproducible unique ID in order to identify them mainly for the bulk selection
export const useItemIdentify = (items, options = {}) => {
  const identifier = options?.identifier || getIdProp;

  return items.map((item) => identify(item, identifier));
};

export default useItemIdentify;
