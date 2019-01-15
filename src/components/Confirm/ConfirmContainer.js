import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withAuthRequest } from '../helpers';

const styles = theme => ({
  cardWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    margin: 'auto'
  }
});

class ConfirmContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={text: 'Validating token...'};
  }

  componentDidMount(){
    const {withRequest, location} = this.props;

    //Get Token
    const {search} = location;
    const searchArray = search.split('=');

    let token;
    for(let i = 0; i < searchArray.length; i = i + 2){
      if((searchArray[i] === 'token' || searchArray[i] === '?token') && searchArray[i+1] !== undefined)
        token = searchArray[i+1];
    }

    //Request confirmation
    withRequest.confirm(token)
    .then(() => {
      this.setState({text: "Account confirmed. Please proceed to login."});
    })
    .catch(() => {
      this.setState({text: "Unable to confirm account."});
    });
  }

  render(){
    const {classes} = this.props;

    return (
      <div className={classes.cardWrapper}>
        <Typography>{this.state.text}</Typography>
      </div>
    );
  }
}

ConfirmContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  withRequest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const ComponentWithStyles = withStyles(styles)(ConfirmContainer);

const ComponentWithAuthRequest = withAuthRequest(ComponentWithStyles);

export default ComponentWithAuthRequest;