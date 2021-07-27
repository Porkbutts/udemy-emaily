import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await fetch('/api/currentUser');
  const text = await res.text();
  dispatch({ type: FETCH_USER, payload: text.length ? JSON.parse(text) : null });
};

export const handleToken = token => async dispatch => {
  const res = await fetch('/api/stripe', { 
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(token) 
  });
  const body = await res.json();
  dispatch({ type: FETCH_USER, payload: body });
}

export const submitSurvey = ({ title, subject, body, emails }, history) => async dispatch => {
  const res = await fetch('/api/surveys', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      title,
      subject,
      body,
      recipients: emails,
    })
  });
  const jsonBody = await res.json();
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: jsonBody });
};
