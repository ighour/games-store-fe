import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { light } from '../themes';
import { AppContext } from '../contexts';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { axios } from '../services';
import jwtDecode from 'jwt-decode';

//Parse local storage for auth
const getAuth = () => {
    let localAuth = localStorage.getItem('auth');

    if(localAuth !== null){
      let auth = JSON.parse(localAuth);

      if(auth['id'] !== undefined && auth['username'] !== undefined && auth['role'] !== undefined && auth['token'] !== undefined)
        return auth;
    }

    return {};
};

class AppContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //Auth
      auth: getAuth(),
      isAuth: this.isAuth.bind(this),
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
   * Check is auth
   */
  isAuth = () => {
    const {auth} = this.state;

    if(auth['id'] !== undefined && auth['username'] !== undefined && auth['role'] !== undefined && auth['token'] !== undefined)
        return true;
    
    return false;
  }

  /**
   * Set authenticated user
   */
  setAuth = (value, token, _remember=true) => {
    if(value === true){
      let decodedToken = jwtDecode(token);

      let auth = {
        id: decodedToken['pay']['id'],
        username: decodedToken['pay']['username'],
        role: decodedToken['pay']['role'],
        token
      };

      //If remember save in local storage
      if(_remember === true)
        localStorage.setItem('auth', JSON.stringify(auth));

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      this.setState({auth});
    }
    else {
      localStorage.removeItem('auth');
      axios.defaults.headers.common['Authorization'] = '';

      //Clear store
      this.setState({auth: {}});
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