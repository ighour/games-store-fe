import React from 'react';
import PropTypes from 'prop-types';
import { withAppContext } from '../../helpers';
import {Form} from './index';
import {validateForm} from '../../../helpers';

class FormContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {...this.props.params.initialValue, errors: {}, _files: {}};
  }

  componentDidMount(){
    if(this.props.getParams){
      const {errors, ...params} = this.state;
      this.props.getParams(params);
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.params.params !== this.props.params.params){
      this.setState({...this.props.params.initialValue, errors: {}});
    }

    if(this.props.getParams){
      const {errors, ...params} = this.state;
      this.props.getParams(params);
    }
  }

  setParam(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : (target.type === 'file' ? target.files[0] : target.value);
    const name = target.name;

    if(target.type === 'file'){
      let saveName = value.name ? value.name : name;
      let val = {[name]: value};
      this.setState({[name]: saveName, _files: {...this.state._files, ...val}});
    }
    else
      this.setState({[name]: value});

    if(this.props.getParams){
      const {errors, ...params} = this.state;
      this.props.getParams(params);
    }
  }

  removeFile(paramName){
    let files = this.state._files;
    delete(files[paramName]);

    this.setState({[paramName]: '', _files: files});
  }

  onSubmit = event => {
    event.preventDefault();

    const {params, onSubmit, appContext, submitSuccessText} = this.props;

    const {setAlert} = appContext;

    const {errors, ...formState} = this.state;

    //Validate
    let validation = validateForm(params, formState);
    if(validation !== true){
      this.setState({errors: validation});
      return;
    }

    //Generate Payload
    let hasFile = false;

    let payload = this.props.params.params.reduce((all, name) => {
      let value = this.state[name];

      if(this.props.params.transformed.hasOwnProperty(name))
        value = this.props.params.transformed[name](value);

      if(this.props.params.formParams[name].type === 'file'){
        value = this.state._files[name] !== undefined ? this.state._files[name] : undefined;

        if(value === undefined)
          return all;
          
        hasFile = true;
      }

      all[name] = value;

      return all;
    }, {});

    //Change to File Upload
    let headers = undefined;

    if(hasFile){
      let formData = new FormData();
      
      let params = Object.keys(payload);

      for(let i = 0; i < params.length; i++){
        let param = params[i];

        if(payload[param] !== undefined)
          formData.append(param, payload[param]);
      }

      payload = formData;

      headers = [
        {name: 'Content-Type', value: 'multipart/form-data'}
      ];
    }

    //Request
    onSubmit(payload, headers)
    .then(() => {
      if(submitSuccessText !== undefined)
        setAlert(submitSuccessText, "primary");
    })
    .catch(error => {
      let data = error.response.data;

      if(data.message === 'FORM_VALIDATION_ERROR')
        this.setState({errors: data.payload.errors});

      else
        setAlert(data.message);
    });
  }

  render(){
    const {params, onSubmit, submitText, children} = this.props;

    const formParams = params.formParams;

    const submitTextParse = submitText !== undefined ? (typeof submitText === 'function' ? submitText.bind(this)() : submitText) : undefined;

    const {errors, ...formState} = this.state;

    return (
      <Form
        formParams={formParams}
        formState={formState}
        errors={errors}
        submitText={submitTextParse}
        setParam={this.setParam.bind(this)}
        onSubmit={onSubmit !== undefined ? this.onSubmit.bind(this) : undefined}
        children={children}
        removeFile={this.removeFile.bind(this)}
      />
    );
  }
}

FormContainer.propTypes = {
  params: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  submitText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  submitSuccessText: PropTypes.string,
  appContext: PropTypes.object.isRequired,
  children: PropTypes.node,
  getParams: PropTypes.func
};

const ComponentWithAppContext = withAppContext(FormContainer);

export default ComponentWithAppContext;