const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const MongoClient = require('mongodb').MongoClient;
const typeDefs = require('./schema.js');
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

// Provide resolver functions for the schema fields.
const resolvers = {
  Query: {
    allUsers: async (root, args) => {
      const resultData = await db.collection('user').find();

      if (Number.isInteger(args.first)) {
        await resultData.limit(args.first);
      }
      if (Number.isInteger(args.skip)) {
        await resultData.skip(args.skip);
      }
      switch (args.orderBy) {
        case 'id_ASC':
          await resultData.sort({ _id: 1 });
          break;
        case 'id_DESC':
          await resultData.sort({ _id: -1 });
          break;
        case 'firstName_ASC':
          await resultData.sort({ firstName: 1 });
          break;
        case 'firstName_DESC':
          await resultData.sort({ firstName: -1 });
          break;
        case 'lastName_ASC':
          await resultData.sort({ lastName: 1 });
          break;
        case 'lastName_DESC':
          await resultData.sort({ lastName: -1 });
          break;
        case 'phone_ASC':
          await resultData.sort({ phone: 1 });
          break;
        case 'phone_DESC':
          await resultData.sort({ phone: -1 });
          break;
      }
      return await resultData.toArray();
    },
    userById: async (root, args, context, info) => {
      const result = await db.collection('user').findOne({ _id: parseInt(args.id) });
      return result;
    },
    filterUsers: async (root, args, context, info) => {
      const result = await db.collection('user').find(args.input).toArray();
      return result;
    },
    friends: () => 'Hello friends!'
  },
  Mutation: {
    addUser: async (parent, args) => {
      const lastId = await db.collection('user').find({}).sort({ _id: -1 }).limit(1).toArray();

      const newUser = {
        _id: lastId[0]._id + 1,
        firstName: args.firstName,
        lastName: args.lastName,
        phone: args.phone
      };

      await db.collection('user').insertOne(newUser);
      return newUser;
    }
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
