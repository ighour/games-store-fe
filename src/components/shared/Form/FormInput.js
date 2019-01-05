import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, MenuItem, TextField } from '@material-ui/core';

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit
  }
});

const Form = props => {
  const {classes, error, helperText, setParam, name, label, value, placeholder, autoFocus, required, type, inputProps, select} = props;

  return (
    <FormGroup>
      <TextField
        className={classes.textField}
        error={error}
        helperText={helperText}
        onChange={setParam}
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        type={type}
        inputProps={inputProps}
        select={select !== undefined}
      >
        {select &&
        select.map(option =>
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )
        }
      </TextField>
    </FormGroup>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  setParam: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  select: PropTypes.array  
};

const ComponentWithStyles = withStyles(styles)(Form);

export default ComponentWithStyles;