import React from 'react';
import PropTypes from 'prop-types';
import { ListRow } from '../../../shared';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class UserContainer extends React.Component { 
  constructor(props){
    super(props);
    this.state = {expanded: false};
  }

  changeExpanded(){
    if(this.state.expanded === true)
      this.setState({expanded: false});
    else
      this.setState({expanded: true});
  }

  render(){
    const {user} = this.props;

    const username = user.username;
    const email = user.email;
    const role = user.role !== 'admin' ? 'Common' : 'Admin';

    const expandedTexts = [];
    expandedTexts.push({label: 'Role:', value: role});

    return (
      <ListRow
        primaryText={username}
        secondaryText={email}
        expandButtonAction={this.changeExpanded.bind(this)}
        ExpandButtonIcon={<ExpandMoreIcon/>}
        expandedTexts={expandedTexts}
      />
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserContainer;