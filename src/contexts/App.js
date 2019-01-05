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
});

context.displayName = 'AppContext';

export default context;