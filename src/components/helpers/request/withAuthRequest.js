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
      const {_remember, ...loginParams} = params;

      return withRequest.post('/login', loginParams)
      .then(response => {
        store.setAuth(response.data.payload, _remember);

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
    const register = (params, headers) => {
      //Callback URL (USING HASHES)
      const callbackURL = window.location.origin + "/#/confirm";

      if(params instanceof FormData){
        params.append('callback', callbackURL);
      }
      else{
        params = {...params, callback: callbackURL};
      }

      return withRequest.post('/users', params, headers)
      .then(response => {        
        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    /**
     * Forget Password
     */
    const forget = params => {
      //Callback URL (USING HASHES)
      const callbackURL = window.location.origin + "/#/recover";

      return withRequest.post('/forget', {...params, callback: callbackURL})
      .then(response => {
        store.setAlert("Check you email.", 'primary');

        return response;
      })
      .catch(error => {
        throw(error);
      });
    };

    /**
     * Recover Password
     */
    const recover = (params, token) => {
      return withRequest.post('/recover', {...params, token})
      .then(response => {
        store.setAlert("Password reset.", 'primary');

        return response;
      })
      .catch(error => {
        throw(error);
      });
    };

    /**
     * Change Profile
     */
    const update = (params, headers, id) => {
      return withRequest.put(`/users/${id}/edit`, params, headers)
      .then(response => {
        store.removeAuth();

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    /**
     * Confirm user
     */
    const confirm = (token) => {
      return withRequest.post('/confirm', {token})
      .then(response => {
        store.setAlert("Email confirmed!", 'primary');

        return response;
      })
      .catch(error => {
        throw(error);
      });
    };

    const requestMethods = {login, logout, register, forget, recover, update, confirm};

    return (
      <Component {...props} {...{[requestName === undefined ? 'withRequest' : requestName]:requestMethods}}/>
    );
  };

  WithAuthRequest.displayName = `WithAuthRequest(${Component.displayName || Component.name || 'Component'})`;

  WithAuthRequest.propTypes = {
    withRequest: PropTypes.object.isRequired,
    store: PropTypes.object,
    location: PropTypes.object.isRequired
  };

  const ComponentWithRequest = withRequest(WithAuthRequest);

  const ComponentWithAuthStore = withAuthStore(ComponentWithRequest);

  return ComponentWithAuthStore;
};