import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, SnackbarContent as MaterialSnackbarContent } from '@material-ui/core';
import { CheckCircle as CheckCircleIcon, Close as CloseIcon, Error as ErrorIcon, Info as InfoIcon } from '@material-ui/icons';

const icons = {
  primary: CheckCircleIcon,
  secondary: InfoIcon,
  error: ErrorIcon
};

const styles = theme => ({
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

const SnackBarContent = props => {
  const {classes, message, variant, onClose} = props;

  const Icon = icons[variant];

  const alertMessage =
    <span id='alert-message' className={classes.message}>
      <Icon className={classNames(classes.icon, classes.iconVariant)}/>
      {message}
    </span>;

  const action = [
    <IconButton
      key='close'
      aria-label='Close'
      color='inherit'
      className={classes.close}
      onClick={onClose}
    >
      <CloseIcon className={classes.icon}/>
    </IconButton>
  ];

  return (
    <MaterialSnackbarContent
      className={classNames(classes[variant])}
      aria-describedby='alert-message'
      message={alertMessage}
      action={action}
    />
  );
};

SnackBarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error']).isRequired,
  onClose: PropTypes.func.isRequired
};

const ComponentWithStyles = withStyles(styles)(SnackBarContent);

export default ComponentWithStyles;