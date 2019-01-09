import React from 'react';
import PropTypes from 'prop-types';
import {withAppContext} from '../index';
import {normalizeById} from '../../../helpers';

export default (Component, storeName) => {
  const WithItemStore = props => {

    const {appContext} = props;

    /* READ-ONLY DATA */
    const {items, itemCategories, auth} = appContext;

    /* INDEX */
    const fetchAll = elements => {
      //Normalize elements
      const elementsById = normalizeById(elements);

      //Sync Store
      appContext.setAll('items', elementsById);
    };

    /* CREATE */
    const storeElement = element => {
      //Sync Store
      appContext.storeElement('items', element);
    };

    /* EDIT */
    const update = element => {
      //Sync Store
      appContext.updateElement('items', element);
    };

    /* DELETE */
    const destroy = element => {
      //Sync Store
      appContext.destroyElement('items', element);
    };

    /* CHECK IS LOADED */
    const checkIsLoaded = () => {
      return appContext.checkIsLoaded('items');
    };

    const setAlert = (message, variant) => {
      appContext.setAlert(message, variant);
    };

    const storeInterface = {items, itemCategories, auth, fetchAll, storeElement, update, destroy, checkIsLoaded, setAlert};

    return (
      <Component {...props} {...{[storeName === undefined ? 'store' : storeName]: storeInterface}}/>
    );
  };

  WithItemStore.displayName = `WithItemStore(${Component.displayName || Component.name || 'Component'})`;

  WithItemStore.propTypes = {
    appContext: PropTypes.object.isRequired
  };

  const ComponentWithAppContext = withAppContext(WithItemStore);

  return ComponentWithAppContext;
};