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
      isAuth: localStorage.getItem('token') !== null,
      setAuth: this.setAuth.bind(this),

      //AppBar
      appBarTitle: 'Games Store',
      setAppBarTitle: this.setAppBarTitle.bind(this),

      //Loading
      isLoading: false,
      setLoading: this.setLoading.bind(this),

      //Alert
      alertMessage: "",
      alertVariant: "error",
      setAlert: this.setAlert.bind(this)
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

      //Clear store
      this.setState({isAuth: false});
    }
  }

  /**
   * Set app bar title
   */
  setAppBarTitle = payload => {
    this.setState({appBarTitle: payload});
  }

  /**
   * Set app is loading
   */
  setLoading = payload => {
    this.setState({isLoading: payload});
  }

  /**
   * Set alert to screen
   */
  setAlert = (message, variant='error') => {
    this.setState({alertMessage: message, alertVariant: variant});
  }

  render() {
    const {isLoading, alertMessage, alertVariant} = this.state;

    return (
      <MuiThemeProvider theme={light}>
        <AppContext.Provider value={this.state}>
          <HashRouter>
            <App isLoading={isLoading} alertMessage={alertMessage} alertVariant={alertVariant}/>
          </HashRouter>
        </AppContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;