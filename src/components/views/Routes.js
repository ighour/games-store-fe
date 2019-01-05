import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAppContext } from '../helpers';
import AuthView from './Auth';
import AdminView from './Admin';
import UserView from './User';

const Routes = ({ appContext }) => {
  return (
    appContext.isAuth() ? 
    <Switch>
      {
        appContext.isRole('admin') &&
        <Route path='/admin' component={AdminView}/>
      }

      <Route path='/profile' component={UserView}/>

      {appContext.isRole('admin') ?
        <Redirect push to='/admin'/>
        :
        <Redirect push to='/profile'/>
      } 
    </Switch>
    :
    <AuthView/>
  );
};

Routes.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(Routes);

export default ComponentWithAppContext;