const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        savedShipWrecks: [ShipWreck]
    }
    type Auth {
        token: ID!
        user: User
    }
    type ShipWreck {
        name: String
        shipWreckId: String
        image: String
        coordinates: String
        reasonForSinking: String
        yearSunk: String
        casualties: String
        country: String
        bodyOfWater: String
        description: String
        rarity: String
        treasure: [String]
    }
    input InputShipWreck {
        name: String
        shipWreckId: String
        image: String
        coordinates: String
        reasonForSinking: String
        yearSunk: String
        casualties: String
        country: String
        bodyOfWater: String
        description: String
        rarity: String
        treasure: [String]
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
