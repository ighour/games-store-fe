import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAppContext } from '../helpers';
import AuthView from './Auth';

const Routes = ({ appContext }) => {
  return (
    appContext.isAuth ? 
    null
    :
    <AuthView/>
  );
};

Routes.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(Routes);

export default ComponentWithAppContext;