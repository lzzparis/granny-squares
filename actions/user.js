export const AUTHENTICATE = 'authenticate';

export const authenticate = (user) => ({
  type: AUTHENTICATE,
  payload: user,
});
