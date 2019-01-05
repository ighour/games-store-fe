import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, FormGroup } from '@material-ui/core';
import {FormInput, FormSwitch} from './index';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'inherit'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3
  }
});

const Form = props => {
  const {classes, formParams, formState, errors, submitText, setParam, onSubmit, children} = props;

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        {Object.keys(formParams).map(paramName => 
          formParams[paramName].type === 'checkbox' ?
          <FormSwitch key={paramName}
            error={errors[paramName] !== undefined && errors[paramName].length > 0}
            helperText={errors[paramName] !== undefined && errors[paramName].length > 0 ? errors[paramName][0] : undefined}
            setParam={setParam}
            name={paramName}
            label={formParams[paramName].label}
            value={formState[paramName]}
          />
          :
          <FormInput key={paramName}
            error={errors[paramName] !== undefined && errors[paramName].length > 0}
            helperText={errors[paramName] !== undefined && errors[paramName].length > 0 ? errors[paramName][0] : undefined}
            setParam={setParam}
            name={paramName}
            label={formParams[paramName].label}
            value={formState[paramName]}
            placeholder={formParams[paramName].placeholder}
            autoFocus={formParams[paramName].autoFocus}
            required={formParams[paramName].required}
            type={formParams[paramName].type}
            inputProps={formParams[paramName].inputProps}
            select={formParams[paramName].select}
          />
        )}
        {submitText && onSubmit &&
        <FormGroup>
          <Fab
            type='submit'
            variant='extended'
            color='primary'
            className={classes.button}
          >
            {submitText}
          </Fab>
        </FormGroup>
        }
      </form>
      {children}
    </div>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  formParams: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  submitText: PropTypes.string,
  setParam: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.node
};

const ComponentWithStyles = withStyles(styles)(Form);

export default ComponentWithStyles;