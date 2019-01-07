import React from 'react';
import PropTypes from 'prop-types';
import {withAppContext} from '../index';

export default (Component, storeName) => {
  const WithAuthStore = props => {

    const {appContext} = props;

    /* SET AUTH */
    const setAuth = (payload, remember) => {
      appContext.setAuth(true, payload.token, remember);
    };

    /* REMOVE AUTH */
    const removeAuth = () => {
      appContext.setAuth(false);
    };

    const setAlert = (message, variant) => {
      appContext.setAlert(message, variant);
    };

    const storeInterface = {setAuth, removeAuth, setAlert};

    return (
      <Component {...props} {...{[storeName === undefined ? 'store' : storeName]: storeInterface}}/>
    );
  };

  WithAuthStore.displayName = `WithAuthStore(${Component.displayName || Component.name || 'Component'})`;

  WithAuthStore.propTypes = {
    appContext: PropTypes.object.isRequired
  };

  const ComponentWithAppContext = withAppContext(WithAuthStore);

  return ComponentWithAppContext;
};