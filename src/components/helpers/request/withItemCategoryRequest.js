import React from 'react';
import PropTypes from 'prop-types';
import withRequest from './withRequest';
import {withItemCategoryStore} from '../index';

export default (Component, requestName) => {
  const WithItemCategoryRequest = props => {

    const {withRequest, store} = props;

    const fetchAll = () => {
      //Avoid sync again
      if(store.checkIsLoaded() === true)
        return new Promise((resolve) => resolve());
  
      return withRequest.get('/item-categories')
      .then(response => {
        store.fetchAll(response.data.payload.item_categories);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const requestMethods = {fetchAll};

    return (
      <Component {...props} {...{[requestName === undefined ? 'withRequest' : requestName]:requestMethods}}/>
    );
  };

  WithItemCategoryRequest.displayName = `WithItemCategoryRequest(${Component.displayName || Component.name || 'Component'})`;

  WithItemCategoryRequest.propTypes = {
    withRequest: PropTypes.object.isRequired,
    store: PropTypes.object
  };

  const ComponentWithRequest = withRequest(WithItemCategoryRequest);

  const ComponentWithItemCategoryStore = withItemCategoryStore(ComponentWithRequest);

  return ComponentWithItemCategoryStore;
};