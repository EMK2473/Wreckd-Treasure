const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
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
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError();
      }

      const token = signToken(user);
      console.log("Logged IN");

      return { token, user };
    },
    logout: async (parent, args, context) => {
      if (context.user) {
        context.user = null;
        return { success: true, message: "Logout Successful" };
      } else {
        throw AuthenticationError;
      }
    },
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
