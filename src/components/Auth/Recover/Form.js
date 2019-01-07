import React from 'react';
import PropTypes from 'prop-types';
import {Form as FormBase} from '../../shared';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 'inherit'
  },
  link: {
    margin: theme.spacing.unit ,
    cursor: 'pointer',
    textDecoration: 'underline'
  }
});

const Form = props => {
  const {classes, params, onSubmit} = props;

  return (
    <div className={classes.root} >
      <FormBase
        params={params}
        onSubmit={onSubmit}
        submitText='Reset Password'
      >
        <Link to='/login'>
          <Typography
            className={classes.link}
            color='secondary'
            variant='body2'
          > Have an account? Login here! </Typography>
        </Link>
      </FormBase>
    </div>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const ComponentWithStyles = withStyles(styles)(Form);

export default ComponentWithStyles;