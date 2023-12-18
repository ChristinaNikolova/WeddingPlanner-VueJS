import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function create(articleId, content) {
  return requester(`${api.comments}/${articleId}`, httpMethods.POST, { content })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function all(articleId) {
  return requester(`${api.comments}/${articleId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function like(id) {
  return requester(`${api.comments}/like/${id}`, httpMethods.POST)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  create,
  all,
  like,
};
