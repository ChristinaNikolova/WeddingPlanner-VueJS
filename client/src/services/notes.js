import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all(plannerId) {
  return requester(`${api.notes}/${plannerId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

// function create(plannerId, description) {
//   return requester(`${api.notes}/${plannerId}`, httpMethods.POST, { description })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

function deleteById(id) {
  return requester(`${api.notes}/${id}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
};

// function getById(plannerId, noteId) {
//   return requester(`${api.notes}/${plannerId}/${noteId}`, httpMethods.GET)
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

// function update(id, description) {
//   return requester(`${api.notes}/${id}`, httpMethods.PUT, { description })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

export default {
  all,
  deleteById,
};
