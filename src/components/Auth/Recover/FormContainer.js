import React from 'react';
import PropTypes from 'prop-types';
import { withAuthRequest } from '../../helpers';
import {parseFormParams} from '../../../helpers';
import Form from './Form';

/* Form parameters */
const params = {
  email: {
    initialValue: '',
    formParams: {
      label: 'E-mail',
      placeholder: 'E-mail',
      autoFocus: true,
      required: true
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['required', 'between:1,255']
  },
  password: {
    initialValue: '',
    formParams: {
      label: 'Password',
      required: true,
      type: 'password'
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['required', 'between:6,255', 'confirmation:password_confirmation']
  },
  password_confirmation: {
    initialValue: '',
    formParams: {
      label: 'Password Confirmation',
      required: true,
      type: 'password'
    },
    transformed: value => {return value.length === 0 ? undefined : value}
  }
};

const FormContainer = props => {
  const {withRequest, history, location} = props;

  //Parse params to reusable component read it
  const parsedParams = parseFormParams(params);

  //Get Token
  const {search} = location;
  const searchArray = search.split('=');
  
  let token;
  for(let i = 0; i < searchArray.length; i = i + 2){
    if((searchArray[i] === 'token' || searchArray[i] === '?token') && searchArray[i+1] !== undefined)
      token = searchArray[i+1];
  }

  //Redirect to login
  const onSubmit = payload => withRequest.recover(payload, token)
    .then(() => {
      history.push('/login');
    });

  return (
    <Form
      params={parsedParams}
      onSubmit={payload => onSubmit(payload)}
    />
  );
};

FormContainer.propTypes = {
  withRequest: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const ComponentWithAuthRequest = withAuthRequest(FormContainer);

export default ComponentWithAuthRequest;