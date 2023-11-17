import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all() {
  return requester(`${api.planners}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function getById(id) {
  return requester(`${api.planners}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function deleteById(id) {
  return requester(`${api.planners}/${id}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
}

// function create (description, date, budget, location, bride, groom){
//   return requester(`${api.planners}`, httpMethods.POST, { description, date, budget, location, bride, groom })
//       .then((res) => res.json())
//       .catch((err) => console.error(err));
// }

// function update(id, description, date, budget, location, bride, brideId, groom, groomId) {
//   return requester(`${api.planners}/${id}`, httpMethods.PUT, { description, date, budget, location, bride, brideId, groom, groomId })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// };

export default {
  all,
  getById,
  deleteById,
};
