import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/App.css';
import { AppBar, Loading } from './common';

const App = props => {

  const {isLoading} = props;

  return (
    <div className="App">
      <AppBar/>
      <main className="App-Content">
        <div id="app-routes"></div>
      </main>
      <Loading isLoading={isLoading}></Loading>
    </div>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  alertVariant: PropTypes.oneOf(['primary', 'secondary', 'error']).isRequired
};

export default App;