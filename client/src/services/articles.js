import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function getLastThree() {
  return fetch(`${api.articles}`, {
    method: httpMethods.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

// function create(title, content, image, jumboImage, category) {
//   return requester(api.adminArticle, httpMethods.POST, { title, content, image, jumboImage, category })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// }

// function update(id, title, content, image, jumboImage, category) {
//   return requester(`${api.adminArticle}/${id}`, httpMethods.PUT, { title, content, image, jumboImage, category })
//     .then(res => res.json())
//     .catch(err => console.error(err));
// }

function deleteById(id) {
  return requester(`${api.adminArticle}/${id}`, httpMethods.DELETE)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function all(currentPage = 1, selectedCategory, query = '') {
  return fetch(`${api.articles}/${currentPage}/${selectedCategory}/${query}`, {
    method: httpMethods.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function getById(id) {
  return requester(`${api.articles}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function like(id) {
  return requester(`${api.articles}/${id}`, httpMethods.POST)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  getLastThree,
  all,
  like,
  getById,
  deleteById,
};
