const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

//set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {

  //custom error message
  AuthenticationError: new GraphQLError('ERROR', {
    extensions: {
        code: 'UNAUTHENTICATED',
    },
  }),

  //authenticated routes
  authMiddleware: function({ req }) {
    //token sent to req.query or header
    let token = req.body.token || req.query.token || req.headers.authorization;
    //separate "Bearer" from "<tokenvalue>"
   if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    //return req with no token
    if (!token) {
      return req;
    }
    //verify token & add user data to req
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('invalid token');
    }
    return req;
  },

  //create token
  signToken: function ({ username, email, _id }) {
    //object with user data to provide token
    const payload = { username, email, _id };
    //sign method takes user object & creates token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};