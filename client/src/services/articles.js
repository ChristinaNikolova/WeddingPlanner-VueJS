import { httpMethods } from '../utils/constants/global';
import { api } from './api';

function getLastThree() {
  return fetch(`${api.articles}`, {
    method: httpMethods.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  getLastThree,
};
