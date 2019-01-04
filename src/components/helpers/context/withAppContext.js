import React from 'react';
import PropTypes from 'prop-types';
import withContext from './withContext';
import {AppContext} from '../../../contexts';

const withAppContext = (Component, contextName) => {
  contextName = contextName === undefined ? 'appContext' : contextName;

  const WithoutContext = props => {
    const {context, ...otherProps} = props;
 
    return (
      <Component {...otherProps} {...{[contextName]: context}}/>
    );
  };

  WithoutContext.propTypes = {
    context: PropTypes.object.isRequired
  };

  const WithAppContext = withContext(AppContext, 'context')(WithoutContext);

  WithAppContext.displayName = `WithAppContext(${WithAppContext.displayName || WithAppContext.name || 'Component'})`;

  return WithAppContext;
};

withAppContext.propTypes = {
  Component: PropTypes.node.isRequired
};

export default withAppContext;