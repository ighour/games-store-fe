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
      label: 'Email',
      placeholder: 'Email',
      autoFocus: true,
      required: true
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['required']
  },
  password: {
    initialValue: '',
    formParams: {
      label: 'Password',
      required: true,
      type: 'password'
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['required']
  },
  _remember: {
    initialValue: true,
    formParams: {
      label: 'Remember Me',
      type: 'checkbox'
    },
    transformed: value => {return value},
    validation: []
  }
};

const FormContainer = props => {
  const {withRequest} = props;

  //Parse params to reusable component read it
  const parsedParams = parseFormParams(params);

  return (
    <Form
      params={parsedParams}
      onSubmit={payload => withRequest.login(payload)}
    />
  );
};

FormContainer.propTypes = {
  withRequest: PropTypes.object.isRequired
};

const ComponentWithAuthRequest = withAuthRequest(FormContainer);

export default ComponentWithAuthRequest;