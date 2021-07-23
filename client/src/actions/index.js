import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await fetch('/api/currentUser');
  const text = await res.text();
  dispatch({ type: FETCH_USER, payload: text.length ? JSON.parse(text) : null });
};
