import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Index, Edit } from '../../User';
import { withAppContext } from '../../helpers';

class UserView extends React.Component {
  componentDidMount(){
    this.updateAppBar();
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props)
      this.updateAppBar();
  }

  updateAppBar(){
    if(this.props.appContext.appBarTitle !== 'Profile'){
      this.props.appContext.setAppBarTitle("Profile");
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/profile' component={Index}/>

        <Route exact path='/profile/edit' component={Edit}/>
        
        <Redirect push to='/profile'/>
      </Switch>
    );
  }
}

UserView.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(UserView);

export default ComponentWithAppContext;