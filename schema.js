const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    allUsers: [User]!
    userById(id: ID!): User
    filterUsers(input: FilterUserFields): [User]!
    friends: String
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
`;

module.exports = typeDefs;
