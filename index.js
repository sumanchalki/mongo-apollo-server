const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://localhost/graphqldb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err, client) {
  if (err) throw err;
  db = client.db('graphqldb');
});

// Construct the schema.
const typeDefs = gql`
  type Query {
    friends: String
    allUsers: [User]!
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    name: String
    phone: Int
  }
`;

// Provide resolver functions for the schema fields.
const resolvers = {
  Query: {
    friends: () => 'Hello friends!',
    allUsers: async () => {
      const result = await db.collection('user').find().toArray();
      result.forEach(obj => { obj.name = obj.firstName + ' ' + obj.lastName });
      return result;
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Apollo Server ready at http://localhost:4000${server.graphqlPath}`)
);
