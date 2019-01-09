const compareByName = (a, b) => {
  if(a === 'null')
    return 1;
  else if(b === 'null')
    return -1;
  
  return a.localeCompare(b);
};

export const sortByName = elements => {
  elements.sort(compareByName);
};

export const sortByAttribute = (elementsList, elements, attribute) => {
  elementsList.sort((a, b) => {
    let eleA = elements[a][attribute];
    let eleB = elements[b][attribute];

    if(eleA === undefined || eleA === null)
      return 1;

    else if(eleB === undefined || eleB === null)
      return -1;

    if(typeof eleA !== 'string')
      eleA = String(eleA);

    if(typeof eleB !== 'string')
      eleB = String(eleB);

    return eleA.localeCompare(eleB);
  });
};