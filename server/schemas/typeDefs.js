const typeDefs = `
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
        description: String

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