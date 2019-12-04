import { gql } from 'apollo-server-core';

const typeDefs = gql`
  type User {
    "ID пользователя в системе"
    id: Int!
    "Логин пользователя"
    login: String!
  }
  type Task {
    "ID задачи в системе"
    id: Int!
    "Номер в системе"
    number: Int!
    "Адрес, по которому находится устройство"
    address: String!
    "Имя управляющей компании, за которой закреплена квартира с устройством"
    mf: String!
    "Сообщение от устройства"
    message: String!
    "Модель устройства"
    device: String!
    "ID устройства"
    deviceId: Int!
    "Дата создания задачи"
    creationTime: Date!
  }
  scalar Date

  type Query {
    "Возвращает список задач"
    tasks: [Task!]
    "Возвращает информацию о текущем авторизованном пользователе"
    me: User
  }

  type Mutation {
    "Авторизация, возвращает токен доступа при успешной авторизации"
    auth("Логин пользователя" login: String!, "Пароль пользователя" password: String!): String
  }
`;

export default typeDefs;
