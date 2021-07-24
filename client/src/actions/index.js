import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await fetch('/api/currentUser');
  const text = await res.text();
  dispatch({ type: FETCH_USER, payload: text.length ? JSON.parse(text) : null });
};

export const handleToken = token => async dispatch => {
  const res = await fetch('/api/stripe', { 
    method: 'POST',
    headers:{ 'content-type': 'application/json' },
    body: JSON.stringify(token) 
  });
  const body = await res.json();
  dispatch({ type: FETCH_USER, payload: body });
}
