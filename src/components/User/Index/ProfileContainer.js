import React from 'react';
import PropTypes from 'prop-types';
import {withUserStore, withUserRequest} from '../../helpers';
import {Card} from '../../shared';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cardWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    margin: 'auto'
  }
});

class ProfileContainer extends React.Component {
  componentDidMount(){
    //Fetch user
    this.props.withRequest.fetch(this.props.store.auth.id)
    .catch(() => {
      this.props.store.setAlert("Unable to load Profile.");
    });
  }

  render(){
    const {classes, store, history} = this.props;
    
    const {auth, users} = store;

    const {id} = auth;

    const user = id === undefined ? undefined : users[id];

    let imgPath = process.env.REACT_APP_API_URL;
    if(user !== undefined && user.avatar !== null)
      imgPath += user.avatar;
    else
      imgPath += process.env.REACT_APP_API_DEFAULT_AVATAR_PATH;

    let attributes = [];
    if(user !== undefined){
      attributes.push({label: 'Username', value: user.username});
      attributes.push({label: 'Email', value: user.email});
      attributes.push({label: 'Role', value: user.role === '_default' ? 'Common' : user.role});
      attributes.push({label: 'Avatar', value: user.avatar === null ? 'None' : 'Yes'});
    }

    let buttons = [
      {label: 'Edit Profile', action: () => {history.push('/profile/edit')}}
    ];

    return (
      user !== undefined &&
      <div className={classes.cardWrapper}>
        <Card
          imageSrc={imgPath}
          imageTitle='Avatar'
          title='Profile'
          attributes={attributes}
          buttons={buttons}
        />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  withRequest: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const ComponentWithStyles = withStyles(styles)(ProfileContainer);

const ComponentWithUserStore = withUserStore(ComponentWithStyles);

const ComponentWithUserRequest = withUserRequest(ComponentWithUserStore);

export default ComponentWithUserRequest;