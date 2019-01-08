import React from 'react';
import PropTypes from 'prop-types';
import {withAppContext} from '../index';
import {normalizeById} from '../../../helpers';

export default (Component, storeName) => {
  const WithItemCategoryStore = props => {

    const {appContext} = props;

    /* READ-ONLY DATA */
    const {itemCategories} = appContext;

    /* INDEX */
    const fetchAll = elements => {
      //Normalize elements
      const elementsById = normalizeById(elements);

      //Sync Store
      appContext.setAll('itemCategories', elementsById);
    };

    /* CREATE */
    const storeElement = element => {
      //Sync Store
      appContext.storeElement('itemCategories', element);
    };

    /* EDIT */
    const update = element => {
      //Sync Store
      appContext.updateElement('itemCategories', element);
    };

    /* DELETE */
    const destroy = element => {
      //Sync Store
      appContext.destroyElement('itemCategories', element);
    };

    /* CHECK IS LOADED */
    const checkIsLoaded = () => {
      return appContext.checkIsLoaded('itemCategories');
    };

    const setAlert = (message, variant) => {
      appContext.setAlert(message, variant);
    };

    const storeInterface = {itemCategories, fetchAll, storeElement, update, destroy, checkIsLoaded, setAlert};

    return (
      <Component {...props} {...{[storeName === undefined ? 'store' : storeName]: storeInterface}}/>
    );
  };

  WithItemCategoryStore.displayName = `WithItemCategoryStore(${Component.displayName || Component.name || 'Component'})`;

  WithItemCategoryStore.propTypes = {
    appContext: PropTypes.object.isRequired
  };

  const ComponentWithAppContext = withAppContext(WithItemCategoryStore);

  return ComponentWithAppContext;
};