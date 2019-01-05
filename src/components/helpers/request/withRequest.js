import React from 'react';
import PropTypes from 'prop-types';
import { withAppContext } from '../index';
import { apiGet, apiPost, apiPut, apiDelete } from '../../../helpers';
import { axios } from '../../../services';

export default Component => {
  class WithRequest extends React.Component {
    constructor(props){
      super(props);

      this.state = {get: this.getRequest, post: this.postRequest, put: this.putRequest, delete: this.deleteRequest};
    }

    request = (method, path, payload) => {
      return new Promise((resolve, reject) => {
        this.props.appContext.setLoading(true);

        method(path, payload ? payload : undefined)
          .then(response => {
            if(process.env.NODE_ENV === 'development'){
              console.log(response);
            } 
            resolve(response);
          })
          .catch(error => {
            if(process.env.NODE_ENV === 'development'){
              console.log(error);
              console.log(error.response);
            }

            //Handle Invalid Token
            if(error.response && error.response.data && error.response.data.message === 'INVALID_TOKEN'){
              //Remove auth
              localStorage.removeItem('token');
              axios.defaults.headers.common['Authorization'] = '';
              this.props.appContext.setAuth(false);
            }

            //Handle Invalid Token Access
            else if(error.response && error.response.data && error.response.data.message === 'INVALID_TOKEN_ACCESS'){
              //REDIRECT TO /
              //TODO
            }

            //Pass Other Errors Forward
            else
              reject(error);
          })
          .finally(() => {
            this.props.appContext.setLoading(false);
          });
      });
    }

    getRequest = path => this.request(apiGet, path)
    postRequest = (path, payload) => this.request(apiPost, path, payload)
    putRequest = (path, payload) => this.request(apiPut, path, payload)
    deleteRequest = path => this.request(apiDelete, path)

    render(){
      return (
        <Component withRequest={this.state} {...this.props}/>
      );
    }
  };

  WithRequest.displayName = `WithRequest(${Component.displayName || Component.name || 'Component'})`;

  WithRequest.propTypes = {
    appContext: PropTypes.object.isRequired
  };

  const ComponentWithAppContext = withAppContext(WithRequest);

  return ComponentWithAppContext;
}