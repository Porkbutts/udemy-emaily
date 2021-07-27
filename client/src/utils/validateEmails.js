/* eslint-disable import/no-anonymous-default-export */
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((e) => e.trim())
    .filter((e) => e !== '')
    .filter((e) => !re.test(e));
  if (invalidEmails.length) {
    return `Invalid emails: ${invalidEmails}`;
  }
  return;
};
