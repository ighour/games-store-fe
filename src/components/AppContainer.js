import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { light } from '../themes';
import { HashRouter } from 'react-router-dom';
import App from './App';

class AppContainer extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={light}>
        <HashRouter>
          <App/>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;