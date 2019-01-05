import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Loading = (props) => {
  const { classes } = props;

  return (
    <Modal
      className={classes.wrapper}
      disableAutoFocus={true}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      open={props.isLoading}
    >
      <CircularProgress/>
    </Modal>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const ComponentWithStyles = withStyles(styles)(Loading);

export default ComponentWithStyles;