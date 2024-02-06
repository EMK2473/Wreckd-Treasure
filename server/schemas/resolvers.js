// Activity 21
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              data = await User.findOne({ _id: context.user._id }).select('-__v -password');
              return data;
            }
            throw new AuthenticationError('You need to be logged in!');
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
            throw new AuthenticationError('User not found. Do you have an account?');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials!');
          }
    
          const token = signToken(user);
          console.log('Logged IN')
          return { token, user };
        },
        logout: async (parent, args, context) => {
          if(context.user) {
            context.user = null;
            return {success: true, message: 'Logout Successful'}
          } else {
            throw new AuthenticationError('You are not logged in.')
          }
        
      },
        saveShipWreck: async (parent, { newShipWreck }, context) => {
          if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { savedShipWrecks: newShipWreck }},
              { new: true }
            );
            return updatedUser;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        removeShipWreck: async (parent, { shipWreckId }, context) => {
          if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $pull: { savedShipWrecks: { shipWreckId }}},
              { new: true }
            );
            return updatedUser;
          }
          throw new AuthenticationError('Login required!');
        },
    }
};

module.exports = resolvers;