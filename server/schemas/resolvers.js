const User = require("../models/User"); // Ensure correct path to the User model
const { signToken, AuthenticationError } = require("../utils/auth");

// resolvers - functions that actually execute the queries and mutations
const resolvers = {
  // query - get user data
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return data;
      } else {
        throw AuthenticationError;
      }
    },
    tours: async () => {
      // Implement logic to fetch all tours
      // Return all tours
    },
    getBookedTours: async (parent, { userId }) => {
      try{
        const user = await User.findById(userId);
        return  user.bookedTours.map(tour => tour.tourName);
      } catch (error){
        throw new Error('Could not fetch booked tours' + error.message)
      }
    },
  },

  // mutation - hook that handles server-side mutations to create/update/delete data or perform server-side-effects
  Mutation: {
    // create user
    // addUser(username: String!, email: String!, password: String!): Auth
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // book tour mutation
    // bookTour(tourId: ID!): User
    bookTour: async (parent, { tourName, shipwrecks }, context) => {
      if (!context.user) {
          throw new Error('User not authenticated');
      }
      try {
          // Find the user by ID
          const user = await User.findById(context.user._id);
          
          // Here we need to associate shipwrecks with the booked tour
          const bookedTour = {
              tourName: tourName,
              shipwrecks: shipwrecks.map(shipwreck => ({
                  name: shipwreck.name,
                  rarity: shipwreck.rarity,
                  image: shipwreck.image,
                  reasonForSinking: shipwreck.reasonForSinking,
                  yearSunk: shipwreck.yearSunk,
                  country: shipwreck.country,
                  bodyOfWater: shipwreck.bodyOfWater,
                  casualties: shipwreck.casualties,
                  coordinates: shipwreck.coordinates,
                  shipWreckId: shipwreck.shipWreckId,
                  treasure: shipwreck.treasure
              }))
          };
  
          // Save the booked tour to the user's bookedTours array
          user.bookedTours.push(bookedTour);
  
          // Save the user with the updated bookedTours array
          await user.save();
  
          return user;
      } catch (error) {
          throw new Error('Could not book tour: ' + error.message);
      }
  },
    // login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // check username credentials
      if (!user) {
        throw AuthenticationError;
      }
      // check password credentials
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError();
      }
      // auth token
      const token = signToken(user);
      console.log("Logged IN");
      return { token, user };
    },

    // logout
    logout: async (parent, args, context) => {
      if (context.user) {
        context.user = null;
        return { success: true, message: "Logout Successful" };
      } else {
        throw AuthenticationError;
      }
    },

    // update user - save shipwreck
    // saveShipWreck(newShipWreck: ShipWreckInput): User
    saveShipWreck: async (parent, { newShipWreck }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedShipWrecks: newShipWreck } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },

    // remove shipwreck
    // removeShipWreck(shipWreckId: ID!): User
    removeShipWreck: async (parent, { shipWreckId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedShipWrecks: { shipWreckId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
