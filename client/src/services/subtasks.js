import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function create(taskId, description) {
  return requester(`${api.subtask}/${taskId}`, httpMethods.POST, { description })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function done(taskId, subtaskId) {
  return requester(`${api.subtask}/${taskId}/${subtaskId}`, httpMethods.POST)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function deleteById(taskId, subtaskId) {
  return requester(`${api.subtask}/${taskId}/${subtaskId}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function getById(id) {
  return requester(`${api.subtask}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function update(id, description) {
  return requester(`${api.subtask}/${id}`, httpMethods.PUT, { description })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  deleteById,
  done,
  create,
  getById,
  update,
};
