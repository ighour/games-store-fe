import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/App.css';
import { AppBar } from './common';

const App = () => {

  return (
    <div className="App">
      <AppBar/>
      <main className="App-Content">
        <div id="app-routes"></div>
      </main>
    </div>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  alertVariant: PropTypes.oneOf(['primary', 'secondary', 'error']).isRequired
};

export default App;