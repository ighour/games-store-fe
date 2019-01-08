const normalizeBy = (elements, attribute) => {
  return elements.reduce((all, element) => {
    all[element[attribute]] = element;
    return all;
  }, {});
};

export const normalizeById = elements => {
  return normalizeBy(elements, 'id');
};