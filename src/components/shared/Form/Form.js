import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, FormGroup, Button } from '@material-ui/core';
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

const getFormInput = (paramName, errors, formParams, formState, setParam) => {
  return <FormInput key={paramName}
    error={errors[paramName] !== undefined && errors[paramName].length > 0}
    helperText={errors[paramName] !== undefined && errors[paramName].length > 0 ? errors[paramName][0] : (formParams[paramName].helper ? formParams[paramName].helper : undefined)}
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
}

const getFormInputFile = (paramName, errors, formParams, formState, setParam, removeFile) => {
  return <React.Fragment key={paramName}>
      <FormInput key={paramName+'form'}
        error={errors[paramName] !== undefined && errors[paramName].length > 0}
        helperText={errors[paramName] !== undefined && errors[paramName].length > 0 ? errors[paramName][0] : (formParams[paramName].helper ? formParams[paramName].helper : undefined)}
        setParam={setParam}
        name={paramName}
        label={formParams[paramName].label}
        value={formState[paramName]}
        placeholder={formParams[paramName].placeholder}
        autoFocus={formParams[paramName].autoFocus}
        required={formParams[paramName].required}
        inputProps={formParams[paramName].inputProps}
        select={formParams[paramName].select}
        disabled={true}
      />
      <FormGroup key={paramName+'button'}>
        <Button
          onClick={() => removeFile(paramName)}
          color='secondary'
          variant='outlined'
          size='small'
        >
          {"Remove " + paramName}
        </Button>
      </FormGroup>
    </React.Fragment>
}

const Form = props => {
  const {classes, formParams, formState, errors, submitText, setParam, onSubmit, children, removeFile} = props;

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        {Object.keys(formParams).map(paramName => {

          return formParams[paramName].type === 'checkbox' ?

          <FormSwitch key={paramName}
            error={errors[paramName] !== undefined && errors[paramName].length > 0}
            helperText={errors[paramName] !== undefined && errors[paramName].length > 0 ? errors[paramName][0] : (formParams[paramName].helper ? formParams[paramName].helper : undefined)}
            setParam={setParam}
            name={paramName}
            label={formParams[paramName].label}
            value={formState[paramName]}
          />

          :

          (
            formParams[paramName].type === 'file' && formState._files[paramName] !== undefined ? 
            getFormInputFile(paramName, errors, formParams, formState, setParam, removeFile)
            :
            getFormInput(paramName, errors, formParams, formState, setParam)
          )

        })}
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
  children: PropTypes.node,
  removeFile: PropTypes.func.isRequired
};

const ComponentWithStyles = withStyles(styles)(Form);

export default ComponentWithStyles;