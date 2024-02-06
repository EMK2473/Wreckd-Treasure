const express = require('express');
//import ApolloServer
const { ApolloServer } = require('@apollo/server');
const path = require('path');
//import middleware
const { authMiddleware } = require("./utils/auth");
const { expressMiddleware } = require('@apollo/server/express4');
// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const booty = require('./config/connection');

const PORT = process.env.PORT || 3001;
const pirate = express();
//create instance of ApolloServer and pass in schema data
const shipwreck = new ApolloServer({
  typeDefs,
  resolvers,
});

//create instance of ApolloServer and pass in schema data
const startApolloServer = async () => {
  await shipwreck.start();

pirate.use(express.urlencoded({ extended: true }));
pirate.use(express.json());

//serve up static assets in production
if (process.env.NODE_ENV === 'production') {
  pirate.use(express.static(path.join(__dirname, '../client/dist')));
}

pirate.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//integrate Apollo server with Express application as middleware
pirate.get('/graphql', expressMiddleware(shipwreck, {
  context: authMiddleware
}));

booty.once('open', () => {
  pirate.listen(PORT, () => {
    console.log(`
============================================================
               W R E C K ' D   T R E A S U R E 
============================================================
888888888888888888888888888888888888888888888888888888888888
888888888888888888888888888888888888888888888888888888888888
8888888888888888888888888P""  ""9888888888888888888888888888
8888888888888888P"88888P          988888"9888888888888888888
8888888888888888  "9888            888P"  888888888888888888
888888888888888888bo "9  d8o  o8b  P" od88888888888888888888
888888888888888888888bob 98"  "8P dod88888888888888888888888
888888888888888888888888    db    88888888888888888888888888
88888888888888888888888888      8888888888888888888888888888
88888888888888888888888P"9bo  odP"98888888888888888888888888
88888888888888888888P" od88888888bo "98888888888888888888888
888888888888888888   d88888888888888b   88888888888888888888
8888888888888888888oo8888888888888888oo888888888888888888888
888888888888888888888888888888888888888wreckdtreasure9888888

              ==============================
                Ahoy matey! join the crew!

                 x     *     *     *   x

                 http://localhost:${PORT}
              ==============================


              graphql path:
              http://localhost:${PORT}/graphql
      `);    
    });
  });
};

startApolloServer(typeDefs, resolvers);
