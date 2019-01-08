import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAppContext } from '../helpers';
import AuthView from './Auth';
import AdminUserView from './AdminUser';
import UserView from './User';

const Routes = ({ appContext }) => {
  return (
    appContext.isAuth() ? 
    <Switch>
      {
        appContext.isRole('admin') &&
        <Route path='/admin/users' component={AdminUserView}/>
      }

      <Route path='/profile' component={UserView}/>

      {appContext.isRole('admin') ?
        <Redirect push to='/admin/users'/>
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