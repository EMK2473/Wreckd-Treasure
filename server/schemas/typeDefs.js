const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        savedShipWrecks: [ShipWreck]
        bookedTours: [Tour]  
    }
    type Auth {
        token: ID!
        user: User
    }
    type Coordinates {
        lat: Float
        lng: Float
    }
    
    type ShipWreck {
        name: String
        shipWreckId: String
        image: String
        coordinates: Coordinates
        reasonForSinking: String
        yearSunk: String
        casualties: String
        country: String
        bodyOfWater: String
        description: String
        rarity: String
        treasure: [String]
    }
    
    type Tour {
        tourName: String
        shipwrecks: [ShipWreck]
    }
    input InputTour {
        name: String
        rarity: String
        image: String
        reasonForSinking: String
        yearSunk: String
        country: String
        bodyOfWater: String
        casualties: String
        coordinates: CoordinatesInput
        shipWreckId: String
        treasure: [String]
    }
      
    input CoordinatesInput {
        lat: Float
        lng: Float
    }
    
    input InputShipWreck {
        name: String
        image: String
        coordinates: CoordinatesInput
        reasonForSinking: String
        yearSunk: String
        casualties: String
        country: String
        bodyOfWater: String
        rarity: String
        treasure: [String]
        shipWreckId: String
    }

    type Query {
        me: User
        tours: [Tour]   
    }

    type Query {
        getBookedTours(userId: ID!): [String]
    }
    type LogoutResponse {
        success: Boolean!
        message: String
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        logout: LogoutResponse
        addUser(username: String!, email: String!, password: String!): Auth
        bookTour(tourName: String, shipwrecks: [InputTour]): User
        saveShipWreck(newShipWreck: InputShipWreck!): User
        removeShipWreck(shipWreckId: String): User
        removeTour(tourName: String!): User
    }
`;

module.exports = typeDefs;
