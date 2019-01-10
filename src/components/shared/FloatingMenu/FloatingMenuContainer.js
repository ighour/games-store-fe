import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import {FloatingMenuSimple, FloatingMenuMultiple} from './index';

class FloatingMenuContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {open: false};
  }

  changeOpen(){
    if(this.state.open === true){
      this.setState({open: false});
    }
    else
      this.setState({open: true});
  }

  changeRoute(number){
    let action = this.props.menu[number].action;

    this.props.history.push(action);
  }

  render() {
    const { menu } = this.props;

    return (
      menu.length > 1 ?
        <FloatingMenuMultiple
          open={this.state.open}
          changeOpen={this.changeOpen.bind(this)}
          changeRoute={this.changeRoute.bind(this)}
          IconOne={menu[0].icon}
          IconTwo={menu.length >= 2 ? menu[1].icon : undefined}
          IconThree={menu.length >= 3 ? menu[2].icon : undefined}
        />
        :
        <FloatingMenuSimple
          IconOne={menu[0].icon}
          changeRoute={this.changeRoute.bind(this)}
        />
    );
  }
}

FloatingMenuContainer.propTypes = {
  menu: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const ComponentWithRouter = withRouter(FloatingMenuContainer);

export default ComponentWithRouter;