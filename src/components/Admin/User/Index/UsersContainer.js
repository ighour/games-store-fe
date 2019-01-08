import React from 'react';
import PropTypes from 'prop-types';
import {withUserStore, withUserRequest} from '../../../helpers';
import {ListGroup} from '../../../shared';
import UserContainer from './UserContainer';

class UsersContainer extends React.Component { 
  componentDidMount(){
    //Fetch accounts
    this.props.withRequest.fetchAll()
    .catch(() => {
      this.props.store.setAlert("Unable to load accounts.");
    });
  }

  render(){
    const {store} = this.props;

    const {users} = store;

    const usersList = Object.keys(users);

    return (
      <ListGroup>
        {usersList.map(userId => 
          <UserContainer
            key={userId}
            user={users[userId]}
          />
        )}
      </ListGroup>
    );
  }
}

UsersContainer.propTypes = {
  store: PropTypes.object.isRequired,
  withRequest: PropTypes.object.isRequired
};

const ComponentWithUserStore = withUserStore(UsersContainer);

const ComponentWithUserRequest = withUserRequest(ComponentWithUserStore);

export default ComponentWithUserRequest;