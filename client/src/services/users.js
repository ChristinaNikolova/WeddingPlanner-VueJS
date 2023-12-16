import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function getFav(currentPage = 1) {
  return requester(`${api.users}/articles/${currentPage}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  getFav,
};
