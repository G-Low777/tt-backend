import jwt from 'express-jwt';

const { JWT_SECRET } = process.env;

const jwtMiddleware = jwt({
  secret: JWT_SECRET,
  credentialsRequired: false,
});

export const authMiddleware = function(...args) {
  try {
    return jwtMiddleware(...args);
  } catch (e) {
    console.warn(e);
  }
};
