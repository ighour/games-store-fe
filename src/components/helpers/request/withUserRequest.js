import React from 'react';
import PropTypes from 'prop-types';
import withRequest from './withRequest';
import {withUserStore} from '../index';

export default (Component, requestName) => {
  const WithUserRequest = props => {

    const {withRequest, store} = props;

    const fetchAll = () => {
      //Avoid sync again
      if(store.checkIsLoaded() === true)
        return new Promise((resolve) => resolve());
  
      return withRequest.get('/users')
      .then(response => {
        store.fetchAll(response.data.payload.users);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const fetch = id => {
      return withRequest.get(`/users/${id}`)
      .then(response => {
        store.fetch(response.data.payload.user);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const update = payload => {
      return withRequest.put(`/users/${payload.id}`, payload)
      .then(response => {
        store.update(response.data.payload.user);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const destroy = payload => {
      return withRequest.delete(`/users/${payload.id}`)
        .then(response => {
          store.destroy(payload);
  
          return response;
        })
        .catch(error => {
          throw(error);
        });
    }

    const requestMethods = {fetchAll, fetch, update, destroy};

    return (
      <Component {...props} {...{[requestName === undefined ? 'withRequest' : requestName]:requestMethods}}/>
    );
  };

  WithUserRequest.displayName = `WithUserRequest(${Component.displayName || Component.name || 'Component'})`;

  WithUserRequest.propTypes = {
    withRequest: PropTypes.object.isRequired,
    store: PropTypes.object
  };

  const ComponentWithRequest = withRequest(WithUserRequest);

  const ComponentWithUserStore = withUserStore(ComponentWithRequest);

  return ComponentWithUserStore;
};