import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { light } from '../themes';
import { AppContext } from '../contexts';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { axios } from '../services';

class AppContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //Auth
      isAuth: localStorage.getItem('token') !== null
    };
  }

  /**
   * Set authenticated user token and auth state or remove them, clearing the store
   */
  setAuth = (value, token) => {
    if(value === true){
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  
      this.setState({isAuth: true});
    }
    else {
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = '';
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={light}>
        <AppContext.Provider value={this.state}>
          <HashRouter>
            <App/>
          </HashRouter>
        </AppContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;