import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/App.css';
import { AppBar, Loading, Alert } from './common';
import Routes from './views';

const App = props => {

  const {isLoading, alertMessage, alertVariant} = props;

  return (
    <div className="App">
      <AppBar/>
      <main className="App-Content">
        <Routes/>
      </main>
      <Loading isLoading={isLoading}></Loading>
      <Alert message={alertMessage} variant={alertVariant}/>
    </div>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  alertVariant: PropTypes.oneOf(['primary', 'secondary', 'error']).isRequired
};

export default App;