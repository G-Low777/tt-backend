import { authUser, getMe } from '../models/Users';
import { getTasks } from '../models/Tasks';
import { authenticated } from '../helpers/token';

export const resolvers = {
  Query: {
    tasks: authenticated(getTasks),
    me: getMe,
  },
  Mutation: {
    auth: authUser,
  },
};
