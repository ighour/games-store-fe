//Parse concrete form params output to reusable form input
export const parseFormParams = (params, executionCallback) => {
  const result = {
    params: [],
    initialValue: {},
    formParams: {},
    transformed: {},
    validation: {}
  };

  Object.keys(params).forEach(paramName => {
    let param = params[paramName];

    result.params.push(paramName); 
    result.initialValue[paramName] = param.initialValue;
    result.formParams[paramName] = param.formParams;
    result.transformed[paramName] = param.transformed;
    result.validation[paramName] = param.validation;
  });

  //Has execution changes
  if(executionCallback !== undefined)
    executionCallback(result);

  return result;
};

//Validate the form
export const validateForm = (params, formState) => {
  const validation = params.validation;
  const transformed = params.transformed;

  let result = Object.keys(validation).reduce((errors, paramId) => {
    let name = paramId;
    let rules = validation[paramId];
    let value = formState[paramId];

    if(rules === undefined)
      return errors;

    if(transformed.hasOwnProperty(paramId))
      value = transformed[paramId](value);

    for(let i = 0; i < rules.length; i++){
      let rule = rules[i];

      let ruleSplit = rule.split(':');
      let ruleType = ruleSplit[0];
      let rulePayload = ruleSplit[1];

      //Not required + no value = pass validation
      if(i === 0 && ruleType !== 'required' && checkRuleRequired(value) !== true)
        return errors;

      //Validate rule
      let result = checkRule(value, ruleType, rulePayload, formState);

      if(result !== true){
        if(!errors.hasOwnProperty(name))
          errors[name] = [];

        errors[name].push(result);
      }
    }

    return errors;
  }, {});

  if(Object.keys(result).length === 0)
    return true;

  return result;
};

const checkRule = (value, ruleType, rulePayload, formState) => {
  switch(ruleType){
    case 'required': return checkRuleRequired(value);
    case 'string': return checkRuleString(value);
    case 'integer': return checkRuleInteger(value);
    case 'between': return checkRuleBetween(value, rulePayload);
    case 'min': return checkRuleMin(value, rulePayload);
    case 'confirmation': return checkRuleConfirmation(value, rulePayload, formState);
    case 'in': return checkRuleIn(value, rulePayload);
    default: return 'FORM_VALIDATION_RULE_ERROR';
  }
};

const checkRuleRequired = (value) => {
  if(value === undefined || value === null || value.length === 0)
    return 'Required field.';

  return true;
};

const checkRuleString = (value) => {
  if(typeof value !== 'string')
    return 'Field needs to be text.';

  return true;
};

const checkRuleInteger = (value) => {
  if(Number.isInteger(value) === false)
    return 'Field needs to be an integer.';

  return true;
};

const checkRuleBetween = (value, rulePayload) => {
  let payloadSplit = rulePayload.split(',');
  let min = payloadSplit[0];
  let max = payloadSplit[1];

  if(typeof value === 'string'){
    if(value.length < min || value.length > max)
      return `Must be between ${min} and ${max} characters.`;
  }
  else{
    if(value < min || value > max)
      return `Must be between ${min} and ${max}.`;
  }

  return true;
};

const checkRuleMin = (value, rulePayload) => {
  if(typeof value === 'string'){
    if(value.length < rulePayload || value.length > rulePayload)
      return `Must be at least ${rulePayload} characters.`;
  }
  else{
    if(value < rulePayload)
      return `Must be more then ${rulePayload}.`;
  }

  return true;
};

const checkRuleConfirmation = (value, rulePayload, formState) => {
  let confirmed = formState[rulePayload];

  if(confirmed === undefined || value !== confirmed)
    return 'Confirmation is wrong.';

  return true;
};

const checkRuleIn = (value, rulePayload) => {
  let payloadSplit = rulePayload.split(',');

  if(!payloadSplit.includes(value)){
    return 'Wrong value was found.';
  }

  return true;
};