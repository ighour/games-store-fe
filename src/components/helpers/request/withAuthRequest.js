import React from 'react';
import PropTypes from 'prop-types';
import withRequest from './withRequest';
import {withAuthStore} from '../index';

export default (Component, requestName) => {
  const WithAuthRequest = props => {

    const {withRequest, store} = props;

    /**
     * Login
     */
    const login = params => {
      return withRequest.post('/login', params)
      .then(response => {
        store.setAuth(response.data.payload);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    };

    /**
     * Logout
     */
    const logout = () => {
      return withRequest.post('/logout')
      .then(response => {return response})
      .catch(error => {throw(error)})
      .finally(() => {
        store.removeAuth();
      });
    }

    /**
     * Register
     */
    const register = params => {
      return withRequest.post('/users', params)
      .then(response => {        
        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const requestMethods = {login, logout, register};

    return (
      <Component {...props} {...{[requestName === undefined ? 'withRequest' : requestName]:requestMethods}}/>
    );
  };

  WithAuthRequest.displayName = `WithAuthRequest(${Component.displayName || Component.name || 'Component'})`;

  WithAuthRequest.propTypes = {
    withRequest: PropTypes.object.isRequired,
    store: PropTypes.object
  };

  const ComponentWithRequest = withRequest(WithAuthRequest);

  const ComponentWithAuthStore = withAuthStore(ComponentWithRequest);

  return ComponentWithAuthStore;
};