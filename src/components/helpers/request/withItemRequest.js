import React from 'react';
import PropTypes from 'prop-types';
import withRequest from './withRequest';
import {withItemStore, withItemCategoryStore} from '../index';

export default (Component, requestName) => {
  const WithItemRequest = props => {

    const {withRequest, store, itemCategoryStore} = props;

    const fetchCategories = () => {
      //Avoid sync again
      if(itemCategoryStore.checkIsLoaded() === true)
        return new Promise((resolve) => resolve());
  
      return withRequest.get('/item-categories')
      .then(response => {
        itemCategoryStore.fetchAll(response.data.payload.item_categories);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const fetchItems = () => {
      //Avoid sync again
      if(store.checkIsLoaded() === true)
        return new Promise((resolve) => resolve());
  
      return withRequest.get('/items')
      .then(response => {
        store.fetchAll(response.data.payload.items);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const fetchAll = () => {
      return fetchCategories()
        .then(() => {
          return fetchItems()
            .then(response => {
              return response;
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw(error);
        });
    }

    const storeElement = payload => {
      return withRequest.post('/items', payload)
      .then(response => {
        store.storeElement(response.data.payload.item);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const update = payload => {
      return withRequest.put(`/items/${payload.id}`, payload)
      .then(response => {
        store.update(response.data.payload.item);

        return response;
      })
      .catch(error => {
        throw(error);
      });
    }

    const destroy = payload => {
      return withRequest.delete(`/items/${payload.id}`)
        .then(response => {
          store.destroy(payload);
  
          return response;
        })
        .catch(error => {
          throw(error);
        });
    }

    const requestMethods = {fetchAll, storeElement, update, destroy};

    return (
      <Component {...props} {...{[requestName === undefined ? 'withRequest' : requestName]:requestMethods}}/>
    );
  };

  WithItemRequest.displayName = `WithItemRequest(${Component.displayName || Component.name || 'Component'})`;

  WithItemRequest.propTypes = {
    withRequest: PropTypes.object.isRequired,
    store: PropTypes.object,
    itemCategoryStore: PropTypes.object
  };

  const ComponentWithRequest = withRequest(WithItemRequest);

  const ComponentWithItemStore = withItemStore(ComponentWithRequest);

  const ComponentWithItemCategoryStore = withItemCategoryStore(ComponentWithItemStore, 'itemCategoryStore');

  return ComponentWithItemCategoryStore;
};