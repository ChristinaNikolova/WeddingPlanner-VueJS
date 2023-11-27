import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all(plannerId) {
  return requester(`${api.guests}/${plannerId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function create(plannerId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
  return requester(`${api.guests}/${plannerId}`, httpMethods.POST, { firstName, lastName, gender, age, side, role, table, mainDish, confirmed })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function deleteById(id) {
  return requester(`${api.guests}/${id}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function update(id, firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
  return requester(`${api.guests}/${id}`, httpMethods.PUT, { firstName, lastName, gender, age, side, role, table, mainDish, confirmed })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function getById(plannerId, guestId) {
  return requester(`${api.guests}/${plannerId}/${guestId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  all,
  deleteById,
  create,
  update,
  getById,
};
