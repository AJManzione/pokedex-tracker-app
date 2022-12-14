const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    pokemonCaught: [Pokemon]
    sprite: String
  }

  type Pokemon {
    _id: ID
    name: String
    type: String
    entry: Number
  }

  type Query {
    user(username: String!): User
    users: [User]
    pokemons: [Pokemon]
    pokemon(name: String!): Pokemon
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    removeUser(username: String!): User
    catchPokemon(username: String!, entry: Number!): User
    unCatchPokemon(username: String!, entry: Number!): User
    updateSprite(username: String!, sprite: String!): User
  }
`;
module.exports = typeDefs;
