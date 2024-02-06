//typeDefs - string that defines data shape & specifies queries that can be used
//mutations are used to modify data

const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        shipWreckCount: Int!
        savedShipWrecks: [ShipWreck]
    }
    type ShipWreck {
        _id: ID!
        shipWreckId: String!
        image: String
    }
    input InputShipWreck {
        shipWreckId: String!
        name: String!
        image: String
        coordinates: String!
        reasonForSinking: String!
        yearSunk: String!
        casualties: String!
        country: String!
        bodyOfWater: String
        shipWreckId: String!
        name: String!
        image: String
        coordinates: String!
        reasonForSinking: String!
        yearSunk: String!
        casualties: String!
        country: String!
        bodyOfWater: String
        description: String

    }
    type Auth {
        token: ID!
        user: User
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
        removeShipWreck(shipWreckId: String!): User
    }
`;

module.exports = typeDefs;