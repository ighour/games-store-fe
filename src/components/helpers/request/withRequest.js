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

    request = (method, path, payload, headers) => {
      return new Promise((resolve, reject) => {
        this.props.appContext.setLoading(true);

        method(path, payload ? payload : undefined, headers ? headers : undefined)
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

            //General error
            if(error.response === undefined || error.response.data === undefined || error.response.data.message === undefined){
              this.props.history.push("/error");
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
              this.props.history.push("/");
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

    getRequest = (path, payload, headers) => this.request(apiGet, path, payload, headers)
    postRequest = (path, payload, headers) => this.request(apiPost, path, payload, headers)
    putRequest = (path, payload, headers) => this.request(apiPut, path, payload, headers)
    deleteRequest = (path, payload, headers) => this.request(apiDelete, path, payload, headers)

    render(){
      return (
        <Component withRequest={this.state} {...this.props}/>
      );
    }
  };

  WithRequest.displayName = `WithRequest(${Component.displayName || Component.name || 'Component'})`;

  WithRequest.propTypes = {
    appContext: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  const ComponentWithAppContext = withAppContext(WithRequest);

  return ComponentWithAppContext;
}