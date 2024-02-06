const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

//resolvers - functions that actually execute the queries and mutations
const resolvers = {
  //query - get user data
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        data = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
        return data;
      }
        throw new AuthenticationError;
    },
  },

    //mutation - hook that handles server-side mutations to create/update/delete data or perform server-side-effects
  Mutation: {
    //login
    //login(email: String!, password: String!): Auth
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
        //check username credentials
        if (!user) {
          throw new AuthenticationError;
        }
        const correctPw = await user.isCorrectPassword(password);
        //check password credentials
        if (!correctPw) {
          throw new AuthenticationError;
        }
        //auth token
        const token = signToken(user);
        console.log('logged in!')
          return { token, user };
    },

    //logout
    logout: async (_, args, context) => {
      if(context.user) {
        context.user = null;
          return {success: true, message: 'Logout Successful'}
        } else {
          throw new AuthenticationError;
        }
    },

    //create user
    //addUser(username: String!, email: String!, password: String!): Auth
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    //update user - save shipwreck
    //saveBook(input: BookInput): User
    saveShipWreck: async (_, { newShipWreck }, context) => {
      console.log("user context", context.user)
      try {
        if (!context.user) {
          throw new AuthenticationError;
        }
        const updatedUser = await User.findByOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedShipWrecks: newShipWreck }},
          { new: true, runValidators: true}
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw AuthenticationError;
      }
    },
        
    //removeShipWreck
    removeShipWreck: async (_, { shipWreckId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedShipWrecks: { shipWreckId }}},
          { new: true }
        );
        return updatedUser;
      }
        throw new AuthenticationError;
    },
  }
};

module.exports = resolvers;