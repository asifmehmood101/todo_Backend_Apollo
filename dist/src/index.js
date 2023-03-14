import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import Todos from '../models/Todo.js';
const MONGODB =
  'mongodb+srv://amehmood999:dFHBAMmUJ2BEaIxN@cluster0.5lwshj8.mongodb.net/todos?retryWrites=true&w=majority';
// type definition
const typeDefs = `#graphql
    
    type Todo {
    _id: String
    title: String
    description: String
}

    input TodoInput {
        title: String
    description: String
    }

   type Query {
    getTodo(ID: ID!):Todo!
    getTodos(limit:Int):[Todo]
   } 

   type Mutation{
    createTodo(todoInput: TodoInput):String!
    updateTodo(ID:ID!,todoInput:TodoInput):String!
    deleteTodo(ID: ID!):String!
   }
`;
const resolvers = {
  Query: {
    async getTodo(_, { ID }) {
      return await Todos.findById(ID);
    },
    async getTodos(_, { limit }) {
      return await Todos.find().limit(limit);
    },
  },
  Mutation: {
    async createTodo(_, { todoInput: { title, description } }) {
      const response = await new Todos({ title, description }).save();
      return response._id;
    },
    async updateTodo(_, { ID, todoInput: { title, description } }) {
      await Todos.updateOne({ _id: ID }, { $set: { title, description } });
      return ID;
    },
    async deleteTodo(_, { ID }) {
      await Todos.findByIdAndRemove({ _id: ID });
      return ID;
    },
  },
};
await connect(MONGODB);
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`server is ready at ${url}`);
