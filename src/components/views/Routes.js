import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAppContext } from '../helpers';
import AuthView from './Auth';
import AdminUserView from './AdminUser';
import UserView from './User';
import ItemView from './Item';
import Error from '../Error';
import Confirm from '../Confirm';

const Routes = ({ appContext }) => {
  return (
    appContext.isAuth() ? 
    <Switch>
      <Route exact path='/error' component={Error}/>
      {
        appContext.isRole('admin') &&
        <Route path='/admin/users' component={AdminUserView}/>
      }

      <Route path='/profile' component={UserView}/>

      <Route path='/games' component={ItemView}/>

      {appContext.isRole('admin') ?
        <Redirect push to='/admin/users'/>
        :
        <Redirect push to='/profile'/>
      } 
    </Switch>
    :
    <Switch>
      <Route exact path='/error' component={Error}/>
      <Route exact path='/confirm' component={Confirm}/>
      <Route path='/games' component={ItemView}/>

      <Route path='/login' component={AuthView}/>
      <Route path='/register' component={AuthView}/>
      <Route path='/forget' component={AuthView}/>
      <Route path='/recover' component={AuthView}/>

      <Redirect push to='/games'/>
    </Switch>
    
  );
};

Routes.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(Routes);

export default ComponentWithAppContext;