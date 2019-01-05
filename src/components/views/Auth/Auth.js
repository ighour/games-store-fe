import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Register} from '../../Auth';
import { withAppContext } from '../../helpers';

class AuthView extends React.Component {
  componentDidMount(){
    this.updateAppBar();
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props)
      this.updateAppBar();
  }

  updateAppBar(){
    if(this.props.appContext.appBarTitle !== 'Games Store'){
      this.props.appContext.setAppBarTitle("Games Store");
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        
        <Redirect push to='/login'/>
      </Switch>
    );
  }
}

AuthView.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(AuthView);

export default ComponentWithAppContext;