import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all() {
  return requester(`${api.planners}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  all,
};
