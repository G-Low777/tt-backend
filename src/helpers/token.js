import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const { JWT_SECRET } = process.env;

export function checkAuthToken(token) {
  return jwt.verify(token, JWT_SECRET, function(err, decoded) {
    if (!err) {
      const { login, id, exp } = decoded;
      const today = new Date().getTime() / 1000;
      if (today > exp) return { error: 'auth_token_expired' };

      return {
        user: {
          id,
          login,
        },
      };
    }

    return { error: 'auth_incorrect_token' };
  });
}

export const authenticated = next => (root, args, context, info) => {
  if (context && context.error) throw new Error(context.error);
  if (!context.user) throw new AuthenticationError('access_denied');

  return next(root, args, context, info);
};
