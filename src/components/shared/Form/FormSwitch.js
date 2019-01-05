import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, FormGroup, FormControlLabel, FormHelperText, Switch } from '@material-ui/core';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  }
});

const FormSwitch = props => {
  const {classes, error, helperText, setParam, name, label, value} = props;

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          className={classes.formControl}
          control={
            <Switch
              checked={value}
              onChange={setParam}
              name={name}
            />
          }
          label={label}
        />
      </FormGroup>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

FormSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  setParam: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool.isRequired
};

const ComponentWithStyles = withStyles(styles)(FormSwitch);

export default ComponentWithStyles;