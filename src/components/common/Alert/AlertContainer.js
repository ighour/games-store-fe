import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from './Snackbar';
import {withAppContext} from '../../helpers';

const AlertContainer = props => {
  const {appContext, message, variant, anchorOrigin, autoHideDuration, ...otherProps} = props;

  const {setAlert} = appContext;

  return(
    <Snackbar
      open={message !== undefined && message !== null && message.length > 0}
      message={message}
      variant={variant}
      onClose={() => setAlert('', variant)}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      {...otherProps}
    />
  );
};

AlertContainer.propTypes = {
  appContext: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error']).isRequired,
  anchorOrigin: PropTypes.object,
  autoHideDuration: PropTypes.number
};

AlertContainer.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  autoHideDuration: 6000
};

const ComponentWithAppContext = withAppContext(AlertContainer);

export default ComponentWithAppContext;