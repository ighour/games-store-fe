import React from 'react';

const context = React.createContext({
  //Auth
  isAuth: false,
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