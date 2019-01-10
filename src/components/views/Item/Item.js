import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Index, Create, Edit } from '../../Item';
import { withAppContext } from '../../helpers';

class ItemView extends React.Component {
  componentDidMount(){
    this.updateAppBar();
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props)
      this.updateAppBar();
  }

  updateAppBar(){
    if(this.props.appContext.appBarTitle !== 'Games List'){
      this.props.appContext.setAppBarTitle("Games List");
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/games' component={Index}/>
        <Route exact path='/games/create' component={Create}/>
        <Route exact path='/games/:id/edit' component={Edit}/>
        <Route exact path='/games/:user' component={Index}/>

        <Redirect push to='/games'/>
      </Switch>
    );
  }
}

ItemView.propTypes = {
  appContext: PropTypes.object.isRequired
};

const ComponentWithAppContext = withAppContext(ItemView);

export default ComponentWithAppContext;