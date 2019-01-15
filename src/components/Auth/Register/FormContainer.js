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
  username: {
    initialValue: '',
    formParams: {
      label: 'Username',
      placeholder: 'Username',
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
  },
  avatar: {
    initialValue: '',
    formParams: {
      label: 'Avatar',
      placeholder: 'Avatar',
      type: 'file',
      helper: '100x100 png'
    },
    transformed: value => {return value},
    validation: []
  }
};

const FormContainer = props => {
  const {withRequest, history} = props;

  //Parse params to reusable component read it
  const parsedParams = parseFormParams(params);

  //Redirect to login
  const onSubmit = (payload, headers) => withRequest.register(payload, headers)
    .then(() => {
      history.push('/login');
    });

  return (
    <Form
      params={parsedParams}
      onSubmit={onSubmit}
      submitSuccessText='Confirm your email before login.'
    />
  );
};

FormContainer.propTypes = {
  withRequest: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const ComponentWithAuthRequest = withAuthRequest(FormContainer);

export default ComponentWithAuthRequest;