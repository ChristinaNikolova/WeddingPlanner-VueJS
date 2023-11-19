import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all(plannerId) {
  return requester(`${api.costs}/${plannerId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

// function create(plannerId, title, price, category) {
//   return requester(`${api.costs}/${plannerId}`, httpMethods.POST, { title, price, category })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

function deleteById(id) {
  return requester(`${api.costs}/${id}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
};

// function getById(plannerId, costId) {
//   return requester(`${api.costs}/${plannerId}/${costId}`, httpMethods.GET)
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

// function update(id, title, price) {
//   return requester(`${api.costs}/${id}`, httpMethods.PUT, { title, price })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

export default {
  all,
  deleteById,
};
