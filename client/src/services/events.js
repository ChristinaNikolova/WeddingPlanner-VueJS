import { httpMethods } from '../utils/constants/global';
import datetime from '../utils/helpers/datetime';
import { api } from './api';
import { requester } from './requester';

function all(plannerId) {
  return requester(`${api.events}/${plannerId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function create(plannerId, title, startTime, endTime, duration) {
  const start = datetime.parseDate(startTime);
  const end = datetime.parseDate(endTime);

  return requester(`${api.events}/${plannerId}`, httpMethods.POST, { title, start, end, duration })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function heightlight(plannerId, eventId) {
  return requester(`${api.events}/${plannerId}/${eventId}`, httpMethods.POST)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function deleteById(id) {
  return requester(`${api.events}/${id}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function getById(plannerId, eventId) {
  return requester(`${api.events}/${plannerId}/${eventId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function update(id, title, startTime, endTime, duration) {
  const start = datetime.parseDate(startTime);
  const end = datetime.parseDate(endTime);

  return requester(`${api.events}/${id}`, httpMethods.PUT, { title, start, end, duration })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  all,
  deleteById,
  create,
  heightlight,
  getById,
  update,
};
