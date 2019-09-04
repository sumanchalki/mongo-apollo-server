const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const MongoClient = require('mongodb').MongoClient;
let db;

(async () => {
  MongoClient.connect('mongodb://localhost/graphqldb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, client) {
    if (err) throw err;
    db = client.db('graphqldb');
  });
})();

// Construct the schema.
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

// Provide resolver functions for the schema fields.
const resolvers = {
  Query: {
    allUsers: async () => {
      const result = await db.collection('user').find().toArray();
      return result;
    },
    userById: async (root, args, context, info) => {
      const result = await db.collection('user').findOne({_id: parseInt(args.id)});
      return null;
    },
    filterUsers: async (root, args, context, info) => {
      const result = await db.collection('user').find(args.input).toArray();
      return result;
    },
    friends: () => 'Hello friends!'
  },
  User: {
    id: parent => parent._id,
    name: parent => `${parent.firstName} ${parent.lastName}`
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Apollo Server ready at http://localhost:4000${server.graphqlPath}`)
);
