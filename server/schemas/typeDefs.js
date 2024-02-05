const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        shipWreckCount: Int
        savedShipWrecks: [ShipWreck]
    }
    type Auth {
        token: ID!
        user: User
    }
    type ShipWreck {
        shipWreckId: ID!
        description: String
        title: String
        image: String
        link: String
    }
    input InputShipWreck {
        shipWreckId: String
        title: String
        description: String
        image: String
        link: String
    }
    type Query {
        me: User
    }
    type LogoutResponse {
    success: Boolean!
    message: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        logout: LogoutResponse
        addUser(username: String!, email: String!, password: String!): Auth
        saveShipWreck(newShipWreck: InputShipWreck!): User
        removeShipWreck(shipWreckId: ID!): User
    }
`;

module.exports = typeDefs;