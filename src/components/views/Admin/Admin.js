import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Index as UserIndex } from '../../Admin/User';
import { withAppContext } from '../../helpers';

class AdminView extends React.Component {
  componentDidMount(){
    this.updateAppBar();
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props)
      this.updateAppBar();
  }

  updateAppBar(){
    if(this.props.appContext.appBarTitle !== 'Admin'){
      this.props.appContext.setAppBarTitle("Admin");
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

AdminView.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(AdminView);

export default ComponentWithAppContext;