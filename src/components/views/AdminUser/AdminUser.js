import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Index as UserIndex } from '../../Admin/User';
import { withAppContext } from '../../helpers';

class AdminUserView extends React.Component {
  componentDidMount(){
    this.updateAppBar();
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props)
      this.updateAppBar();
  }

  updateAppBar(){
    if(this.props.appContext.appBarTitle !== 'Admin: Users'){
      this.props.appContext.setAppBarTitle("Admin: Users");
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/admin/users' component={UserIndex}/>
        
        <Redirect push to='/admin/users'/>
      </Switch>
    );
  }
}

AdminUserView.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(AdminUserView);

export default ComponentWithAppContext;