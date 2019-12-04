import { AuthenticationError } from 'apollo-server';
import { sign } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export function authUser(_, args) {
  const { login, password } = args;

  if (login === 'admin' && password === 'admin') {
    const today = new Date();
    const expirationDate = new Date(today);

    expirationDate.setDate(today.getDate() + 30);

    return sign(
      {
        id: 1,
        login: 'admin',
        exp: expirationDate.getTime() / 1000,
      },
      JWT_SECRET
    );
  }

  throw new AuthenticationError('invalid_credentials');
}

export function getMe(root, args, context) {
  if (context && context.user) {
    return context.user;
  }

  return null;
}
