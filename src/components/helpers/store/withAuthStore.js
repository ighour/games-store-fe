import React from 'react';
import PropTypes from 'prop-types';
import {withAppContext} from '../index';

export default (Component, storeName) => {
  const WithAuthStore = props => {

    const {appContext} = props;

    /* READ-ONLY DATA */
    const {isAuth} = appContext;

    /* SET AUTH */
    const setAuth = payload => {
      appContext.setAuth(true, payload.token);
    };

    /* REMOVE AUTH */
    const removeAuth = () => {
      appContext.setAuth(false);
    };

    const storeInterface = {isAuth, setAuth, removeAuth};

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