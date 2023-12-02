import authService from './auth';

export function requester(url, method, data) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `Bearer ${authService.getToken()}`,
    },
    body: data ? JSON.stringify(data) : null,
  });
}
