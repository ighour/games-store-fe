import React from 'react';

const context = React.createContext({
  //Auth
  auth: {
    id: '',
    username: '',
    role: '_default',
    token: ''
  },
  isAuth: () => {},
  setAuth: () => {},
  isRole: () => {},

  //AppBar
  appBarTitle: 'Games Store',
  setAppBarTitle: () => {},

  //Loading
  isLoading: false,
  setLoading: () => {},

  //Alert
  alertMessage: "",
  alertVariant: "error",
  setAlert: () => {},

  //Users
  usersLoaded: false,
  users: {},

  //Item Categories
  itemCategoriesLoaded: false,
  itemCategories: {},

  //Items
  itemsLoaded: false,
  items: {},

  //Generic CRUD
  setAll: () => {},
  storeElement: () => {},
  updateElement: () => {},
  destroyElement: () => {},
  destroyElements: () => {},
  syncElements: () => {},
  clearElements: () => {},
  checkIsLoaded: () => {}
});

context.displayName = 'AppContext';

export default context;