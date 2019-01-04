import React from 'react';
import PropTypes from 'prop-types';

const withContext = (Context, propName) => {

  const withComponent = WrappedComponent => {
    class ContextConsumer extends React.Component {
      render(){
        return (
          <Context.Consumer>
           {context => (
             <WrappedComponent {...this.props} {...{[propName]:context}}/>
           )}
         </Context.Consumer>
        );
      }
    };

    ContextConsumer.displayName = `With${Context.displayName || Context.name || 'Context'}(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ContextConsumer;
  }

  withComponent.propTypes = {
    WrappedComponent: PropTypes.node.isRequired
  };

  return withComponent;
}

withContext.propTypes = {
  Context: PropTypes.instanceOf(React.Context).isRequired,
  propName: PropTypes.string.isRequired
};

export default withContext;