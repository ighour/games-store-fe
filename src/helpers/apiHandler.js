import axios from '../services/axios';

const getHeaders = (headers) => {
  if(headers === undefined)
    return undefined;

  let result = {headers: {}};

  for(let i = 0; i < headers.length; i++){
    let h = headers[i];

    result.headers[h.name] = h.value;
  }

  return result;
}

//HTTP Get
export const get = (relativePath, payload, headers) => {
  return new Promise((resolve, reject) => {
    axios.get(relativePath, undefined, getHeaders(headers))
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};

//HTTP Post
export const post = (relativePath, payload, headers) => {
  return new Promise((resolve, reject) => {
    axios.post(relativePath, payload, getHeaders(headers))
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};

//HTTP Put
export const put = (relativePath, payload, headers) => {
  return new Promise((resolve, reject) => {
    
    if(payload instanceof FormData){
      payload.append('_method', 'PUT');
    }
    else{
      payload = {...payload, _method: 'PUT'};
    }

    axios.post(relativePath, payload, getHeaders(headers))
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};

//HTTP Delete
export const del = (relativePath, payload, headers) => {
  return new Promise((resolve, reject) => {

    if(payload instanceof FormData){
      payload.append('_method', 'DELETE');
    }
    else{
      payload = {...payload, _method: 'DELETE'};
    }
  
    axios.post(relativePath, payload, getHeaders(headers))
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};