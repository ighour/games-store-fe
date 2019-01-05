import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAuthStore } from '../helpers';
import AuthView from './Auth';

const Routes = ({ store }) => {
  return (
    store.isAuth ? 
    null
    :
    <AuthView/>
  );
};

Routes.propTypes = {
  store: PropTypes.object.isRequired
};

const ComponentWithAuthStore = withAuthStore(Routes);

export default ComponentWithAuthStore;