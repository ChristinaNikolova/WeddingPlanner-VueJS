import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function register(firstName, lastName, email, password) {
  return fetch(api.register, {
    method: httpMethods.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function login(email, password) {
  return fetch(api.login, {
    method: httpMethods.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function logout() {
  return requester(api.logout, httpMethods.GET)
    .catch(err => console.error(err));
};

function getToken() {
  return sessionStorage.getItem('accessToken');
};

export default {
  login,
  register,
  logout,
  getToken,
};
