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

      if(auth['id'] !== undefined && auth['username'] !== undefined && auth['role'] !== undefined && auth['token'] !== undefined){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth['token'];
        return auth;
      }
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
      isRole: this.isRole.bind(this),

      //AppBar
      appBarTitle: 'Games Store',
      setAppBarTitle: this.setAppBarTitle.bind(this),

      //Loading
      isLoading: false,
      setLoading: this.setLoading.bind(this),

      //Alert
      alertMessage: "",
      alertVariant: "error",
      setAlert: this.setAlert.bind(this),

      //Users
      usersLoaded: false,
      users: {},

      //Item Categories
      itemCategoriesLoaded: false,
      itemCategories: {},

      //Items
      itemsLoaded: false,
      items: {},

      //Generic Manipulation of State
      setAll: this.setAll.bind(this),
      storeElement: this.storeElement.bind(this),
      updateElement: this.updateElement.bind(this),
      destroyElement: this.destroyElement.bind(this),
      destroyElements: this.destroyElements.bind(this),
      syncElements: this.syncElements.bind(this),
      clearElements: this.clearElements.bind(this),
      checkIsLoaded: this.checkIsLoaded.bind(this)
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
      this.setState({
        auth: {},
        appBarTitle: 'Games Store',
        usersLoaded: false,
        users: {},
        itemCategoriesLoaded: false,
        itemCategories: {},
        itemsLoaded: false,
        items: {},
      });
    }
  }

  /**
   * Check is role
   */
  isRole = role => {
    const {auth} = this.state;

    if(Array.isArray(role)){
      if(role.includes(auth['role']))
        return true;
    }

    else if(role === auth['role'])
      return true;

    return false;
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

  /* Set all elements of a source in store (for fetching index data) */
  setAll = (stateName, elements) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName) || typeof elements !== 'object')
      throw new Error("STORE_SET_ALL_ERROR");

    this.setState({[stateName]: elements, [`${stateName}Loaded`]: true});
  }

  /* Store an element in store */
  storeElement = (stateName, element) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName) || typeof element !== 'object' || element.id === undefined)
      throw new Error("STORE_STORE_ELEMENT_ERROR");

    this.setState({[stateName]: {...this.state[stateName], [element.id]: element}});
  }

  /* Update an element in store */
  updateElement = (stateName, element) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName) || typeof element !== 'object' || element.id === undefined)
      throw new Error("STORE_UPDATE_ELEMENT_ERROR");

    this.setState({[stateName]: {...this.state[stateName], [element.id]: element}});
  }

  /* Remove an element from store */
  destroyElement = (stateName, element) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName) || typeof element !== 'object' || element.id === undefined)
      throw new Error("STORE_DESTROY_ELEMENT_ERROR");

    let elements = {...this.state[stateName]};

    if(elements !== undefined){
      delete elements[element.id];

      this.setState({[stateName]: elements});
    }
  }

  /* Remove a list of elements from store */
  destroyElements = (stateName, elements) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName) || !Array.isArray(elements))
      throw new Error("STORE_DESTROY_ELEMENTS_ERROR");

    let oldElements = {...this.state[stateName]};

    if(oldElements !== undefined){
      for(let i = 0; i < elements.length; i++){
        let elementId = elements[i].id;
        delete oldElements[elementId];
      }

      this.setState({[stateName]: oldElements});
    }
  }

  /* Sync 1...n elements on store */
  syncElements = (stateName, elements) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName) || typeof elements !== 'object')
      throw new Error("STORE_SYNC_ELEMENTS_ERROR");

    this.setState({[stateName]: {...this.state[stateName], ...elements}});
  }

  /* Clear elements from store */
  clearElements = (stateName) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName))
      throw new Error("STORE_CLEAR_ELEMENTS_ERROR");

    this.setState({[stateName]: {}, [`${stateName}Loaded`]: false});
  }

  /* Check if store was loaded (fetched with setAll) */
  checkIsLoaded = (stateName) => {
    if(typeof stateName !== 'string' || !this.state.hasOwnProperty(stateName))
      throw new Error("STORE_CHECK_IS_LOADED_ERROR");

    return this.state[`${stateName}Loaded`] === true;
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