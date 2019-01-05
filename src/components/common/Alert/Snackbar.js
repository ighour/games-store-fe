import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar as MaterialSnackBar } from '@material-ui/core';
import SnackbarContent from './SnackbarContent';

const styles = theme => ({
  content: {
    margin: theme.spacing.unit
  }
});

const SnackBar = props => {
  const {classes, open, message, variant, onClose, anchorOrigin, autoHideDuration, ...otherProps} = props;

  return (
    <MaterialSnackBar
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      {...otherProps}
    >
      <SnackbarContent
        className={classes.content}
        message={message}
        variant={variant}
        onClose={onClose}
      />
    </MaterialSnackBar>
  );
};

SnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
  anchorOrigin: PropTypes.object.isRequired,
  autoHideDuration: PropTypes.number.isRequired
};

const ComponentWithStyles = withStyles(styles)(SnackBar);

export default ComponentWithStyles;