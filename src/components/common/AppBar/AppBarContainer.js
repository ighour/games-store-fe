import React from 'react';
import PropTypes from 'prop-types';
import { withAuthRequest, withAppContext } from '../../helpers';
import { withRouter } from "react-router";
import { AppBar, AppDrawer } from './index';
import { Toolbar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import LockIcon from '@material-ui/icons/Lock';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import AddIcon from '@material-ui/icons/Add';
import GamesIcon from '@material-ui/icons/Games';

class AppBarContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {drawerOpen: false};
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toRoute = this.toRoute.bind(this);
  }

  toggleDrawer(){
    if(this.state.drawerOpen === true){
      this.setState({drawerOpen: false});
    }
    else
      this.setState({drawerOpen: true});
  }

  getPrimaryMenu(){
    if(this.props.appContext.isAuth() === true){
      return [
        {text: 'Logout', icon: <ExitToAppIcon/>, action: this.props.withRequest.logout}
      ];
    }
    else{
      return [
        {text: 'Login', icon: <PersonIcon/>, action: '/login'},
        {text: 'Register', icon: <PersonAddIcon/>, action: '/register'},
        {text: 'Forget Password', icon: <LockIcon/>, action: '/forget'}
      ];
    }
  }

  getSecondaryMenu(){
    if(this.props.appContext.isAuth() === true){
      if(this.props.appContext.isRole('admin')){
        return [
          {text: 'Users', icon: <GroupIcon/>, action: '/admin/users'},
          {text: 'Profile', icon: <PersonIcon/>, action: '/profile'},
          {text: 'Games List', icon: <VideogameAssetIcon/>, action: '/games'},
          {text: 'Add Game', icon: <AddIcon/>, action: '/games/create'},
          {text: 'My Games', icon: <GamesIcon/>, action: '/games/' + this.props.appContext.auth.id},
        ];
      }
      else{
        return [
          {text: 'Profile', icon: <PersonIcon/>, action: '/profile'},
          {text: 'Games List', icon: <VideogameAssetIcon/>, action: '/games'},
          {text: 'Add Game', icon: <AddIcon/>, action: '/games/create'},
          {text: 'My Games', icon: <GamesIcon/>, action: '/games/' + this.props.appContext.auth.id},
        ];
      }
    }
    else{
      return [
        {text: 'Games List', icon: <VideogameAssetIcon/>, action: '/games'},
        {text: 'Add Game', icon: <AddIcon/>, action: '/games/create'},
      ];
    }
  }

  toRoute(route){
    this.props.history.push(route);
  }

  render(){
    const {appContext} = this.props;

    const primaryMenu = this.getPrimaryMenu();
    const secondaryMenu = this.getSecondaryMenu();

    return (
      <nav>
        <AppBar
          title={appContext.appBarTitle}
          toggleDrawer={this.toggleDrawer}
        />
        <Toolbar/>
        <AppDrawer
          open={this.state.drawerOpen}
          toggle={this.toggleDrawer}
          toRoute={this.toRoute}
          primaryMenu={primaryMenu}
          secondaryMenu={secondaryMenu}
        />
      </nav>
    );
  }
}

AppBarContainer.propTypes = {
  appContext: PropTypes.object.isRequired,
  withRequest: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const ComponentWithAppContext = withAppContext(AppBarContainer);

const ComponentWithAuthRequest = withAuthRequest(ComponentWithAppContext);

const ComponentWithRouter = withRouter(ComponentWithAuthRequest);

export default ComponentWithRouter;