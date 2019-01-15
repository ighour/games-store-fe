import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const styles = theme => ({
  cardWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    margin: 'auto'
  }
});

class ErrorContainer extends React.Component {
  render(){

    const {classes} = this.props;
  
    return (
      <div className={classes.cardWrapper}>
        <Typography>Sorry, there was an error. Please contact admin.</Typography>
      </div>
    );
  }
}

const ComponentWithStyles = withStyles(styles)(ErrorContainer);

export default ComponentWithStyles;