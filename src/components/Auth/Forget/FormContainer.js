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
  }
};

const FormContainer = props => {
  const {withRequest} = props;

  //Parse params to reusable component read it
  const parsedParams = parseFormParams(params);

  //Redirect to login
  const onSubmit = payload => withRequest.forget(payload);

  return (
    <Form
      params={parsedParams}
      onSubmit={payload => onSubmit(payload)}
    />
  );
};

FormContainer.propTypes = {
  withRequest: PropTypes.object.isRequired
};

const ComponentWithAuthRequest = withAuthRequest(FormContainer);

export default ComponentWithAuthRequest;