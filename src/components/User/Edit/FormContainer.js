import React from 'react';
import PropTypes from 'prop-types';
import { withAuthRequest, withAuthStore } from '../../helpers';
import {parseFormParams} from '../../../helpers';
import {Form} from '../../shared';

/* Form parameters */
const params = {
  email: {
    initialValue: '',
    formParams: {
      label: 'E-mail',
      placeholder: 'E-mail',
      autoFocus: true
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['between:1,255']
  },
  username: {
    initialValue: '',
    formParams: {
      label: 'Username',
      placeholder: 'Username',
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['between:1,255']
  },
  password: {
    initialValue: '',
    formParams: {
      label: 'Password',
      type: 'password'
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['between:6,255', 'confirmation:password_confirmation']
  },
  password_confirmation: {
    initialValue: '',
    formParams: {
      label: 'Password Confirmation',
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
  },
  remove_avatar: {
    initialValue: false,
    formParams: {
      label: 'Remove Avatar',
      type: 'checkbox'
    },
    transformed: value => {return value !== true ? undefined : value},
    validation: []
  }
};

const FormContainer = props => {
  const {withRequest, store} = props;

  //Parse params to reusable component read it
  const parsedParams = parseFormParams(params);

  //Redirect to login
  const onSubmit = (payload, headers) => withRequest.update(payload, headers, store.auth.id);

  return (
    <Form
      params={parsedParams}
      onSubmit={onSubmit}
      submitText='Update Profile'
    />
  );
};

FormContainer.propTypes = {
  withRequest: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const ComponentWithAuthRequest = withAuthRequest(FormContainer);

const ComponentWithAuthStore = withAuthStore(ComponentWithAuthRequest);

export default ComponentWithAuthStore;