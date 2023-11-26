import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all(plannerId) {
  return requester(`${api.tasks}/${plannerId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function create(plannerId, title, description, timespan) {
  return requester(`${api.tasks}/${plannerId}`, httpMethods.POST, { title, description, timespan })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function deleteById(id) {
  return requester(`${api.tasks}/${id}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
};

// function getById(plannerId, taskId) {
//   return requester(`${api.tasks}/${plannerId}/${taskId}`, httpMethods.GET)
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

// function update(id, title, description) {
//   return requester(`${api.tasks}/${id}`, httpMethods.PUT, { title, description })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// }

export default {
  all,
  deleteById,
  create,
};
