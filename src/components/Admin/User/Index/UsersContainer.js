import React from 'react';
import PropTypes from 'prop-types';
import {withUserStore, withUserRequest} from '../../../helpers';
import {ListGroup, DeleteDialog} from '../../../shared';
import UserContainer from './UserContainer';

class UsersContainer extends React.Component { 
  constructor(props){
    super(props);
    this.state = {deleteDialog: false};
  }

  componentDidMount(){
    //Fetch accounts
    this.props.withRequest.fetchAll()
    .catch(() => {
      this.props.store.setAlert("Unable to load accounts.");
    });
  }

  onDelete(){
    const id = this.state.deleteDialog;
    const element = this.props.store.users[id];

    this.props.withRequest.destroy(element)
    .then(() => {
      this.props.store.setAlert("Account was deleted.", "primary");
    })
    .catch(error => {
      let data = error.response.data;
      
      this.props.store.setAlert(data.message);
    })
    .finally(() => {
      this.setState({deleteDialog: false});
    });
  }

  render(){
    const {store} = this.props;

    const {deleteDialog} = this.state;

    const {users} = store;

    const usersList = Object.keys(users);

    return (
      <React.Fragment>
        <ListGroup>
          {usersList.map(userId => 
            <UserContainer
              key={userId}
              user={users[userId]}
              deleteDialogSet={(value) => {this.setState({deleteDialog: value})}}
            />
          )}
        </ListGroup>
        <DeleteDialog
          open={deleteDialog !== false}
          onCancel={() => {this.setState({deleteDialog: false})}}
          onConfirm={() => this.onDelete()}
          title='Confirm deleting this user?'
        />
      </React.Fragment>
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