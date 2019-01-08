import axios from '../services/axios';

//HTTP Get
export const get = (relativePath) => {
  return new Promise((resolve, reject) => {
    axios.get(relativePath)
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};

//HTTP Post
export const post = (relativePath, payload) => {
  return new Promise((resolve, reject) => {
    axios.post(relativePath, payload)
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};

//HTTP Put
export const put = (relativePath, payload) => {
  return new Promise((resolve, reject) => {
    axios.post(relativePath, {...payload, _method: 'PUT'})
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};

//HTTP Delete
export const del = (relativePath) => {
  return new Promise((resolve, reject) => {
    axios.post(relativePath, {_method: 'DELETE'})
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};