import React from 'react';
import PropTypes from 'prop-types';
import {withAppContext} from '../index';
import {normalizeById} from '../../../helpers';

export default (Component, storeName) => {
  const WithUserStore = props => {

    const {appContext} = props;

    /* READ-ONLY DATA */
    const {users} = appContext;

    /* INDEX */
    const fetchAll = elements => {
      //Normalize elements
      const elementsById = normalizeById(elements);

      //Sync Store
      appContext.setAll('users', elementsById);
    };

    /* CREATE */
    const storeElement = element => {
      //Sync Store
      appContext.storeElement('users', element);
    };

    /* EDIT */
    const update = element => {
      //Sync Store
      appContext.updateElement('users', element);
    };

    /* DELETE */
    const destroy = element => {
      //Sync Store
      appContext.destroyElement('users', element);

      //Destroy: items (dependency)
      const items = appContext.items;
      let itemsToDestroy = [];

      Object.keys(items).forEach(itemId => {
        let item = items[itemId];

        if(item.user_id === element.id){
          itemsToDestroy.push(item);
        }
      });

      if(itemsToDestroy.length > 0)
      appContext.destroyElements('items', itemsToDestroy);

    };

    /* CHECK IS LOADED */
    const checkIsLoaded = () => {
      return appContext.checkIsLoaded('users');
    };

    const setAlert = (message, variant) => {
      appContext.setAlert(message, variant);
    };

    const storeInterface = {users, fetchAll, storeElement, update, destroy, checkIsLoaded, setAlert};

    return (
      <Component {...props} {...{[storeName === undefined ? 'store' : storeName]: storeInterface}}/>
    );
  };

  WithUserStore.displayName = `WithUserStore(${Component.displayName || Component.name || 'Component'})`;

  WithUserStore.propTypes = {
    appContext: PropTypes.object.isRequired
  };

  const ComponentWithAppContext = withAppContext(WithUserStore);

  return ComponentWithAppContext;
};