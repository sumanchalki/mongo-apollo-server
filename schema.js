const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    allUsers(skip: Int, first: Int, orderBy: UserOrderByInput): [User]!
    userById(id: ID!): User
    filterUsers(input: FilterUserFields): [User]!
    friends: String
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, phone: Int): User!
    updateUser(id: ID!, firstName: String, lastName: String, phone: Int): User!
    deleteUser(id: ID!): User!
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    name: String
    phone: Int
  }
  input FilterUserFields {
    id: ID
    firstName: String
    lastName: String
    phone: Int
  }
  enum UserOrderByInput {
    id_ASC
    id_DESC
    firstName_ASC
    firstName_DESC
    lastName_ASC
    lastName_DESC
    phone_ASC
    phone_DESC
  }
`;

module.exports = typeDefs;
