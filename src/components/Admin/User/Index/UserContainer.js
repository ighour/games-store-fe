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

    const defaultAvatarURL = process.env.REACT_APP_API_URL + 'img/avatar.png';

    const image = {
      name: 'avatar',
      src: user.avatar !== null ? user.avatar : defaultAvatarURL,
      sizes: '100px 100px',
      fallback: defaultAvatarURL,
      position: 'default'
    };

    return (
      <ListRow
        primaryText={username}
        secondaryText={email}
        expandButtonAction={this.changeExpanded.bind(this)}
        ExpandButtonIcon={<ExpandMoreIcon/>}
        expandedTexts={expandedTexts}
        image={image}
      />
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserContainer;