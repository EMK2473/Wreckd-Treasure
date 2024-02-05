<p align="center">
<img src="./sunken-booty/branding/header.png"/>
</p>

[![license: mit](https://img.shields.io/badge/license-mit-blue)](https://opensource.org/licenses/MIT)
[![mongodb badge](https://img.shields.io/badge/mongodb-darkblue.svg?&logo=MongoDB&logoColor=white)](https://www.mongodb.com/)
[![express.js badge](https://img.shields.io/badge/express-yellow.svg?&logo=Express&logoColor=white)](https://expressjs.com/)
[![react badge](https://img.shields.io/badge/react-lightgrey.svg?&logo=React&logoColor=white)](https://react.dev/)
[![node.js badge](https://img.shields.io/badge/node-teal?logo=nodedotjs&logoColor=white&style=flat)](https://nodejs.org/en)
[![apollo badge](https://img.shields.io/badge/-apollographQL-lightblue?&logo=apollo-graphql)](https://www.apollographql.com/)
[![heroku badge](https://img.shields.io/badge/heroku-grey.svg?&logo=Insomnia&logoColor=white)](https://heroku.com)
[![canva badge](https://img.shields.io/badge/canva-lightyellow.svg?&logo=Canva&logoColor=white)](https://canva.com/)
[![vite badge](https://img.shields.io/badge/vite-midnightblue.svg?&logo=Vite&logoColor=white)](https://vitejs.dev/)

<p align="left">
  <img alt="mode" src="https://img.shields.io/badge/view-darkmode-black.svg?&logo=Github&logoColor=white" >
</p>

### ![table-of-contents](./sunken-booty/branding/toc.png)

- [OVERVIEW](#overview)
  - [*user story*](#user-story)
  - [*concept design*](#concept-design)
  - [*booty list*](#luck-list)
  - [*the treasure team*](#team)
- [INSTALLATION](#installation)
- [USAGE](#usage)
  - [*screenshot*](#screenshot)
  - [*demo*](#demo)
- [TESTING](#testing)
- [SOURCES](#sources)
- [LICENSE](#license)
- [LINKS](#links)
- [CONNECT](#connect)


### ![overview](./sunken-booty/branding/1.png)

`WRECK'D TREASURE` is an interactive, user-focuced [MERN](https://www.geeksforgeeks.org/mern-stack/) application dedicated to ***shipwrecks of the sea***. The app uses [React](https://react.dev/) for the **front-end**, [GraphQl](https://graphql.org/) API with a [Node.js](https://nodejs.org/en) and [Express.js](https://www.npmjs.com/package/express) **server**, and [MongoDB](https://www.mongodb.com/) / [Mongoose](https://mongoosejs.com/docs/) `ODM` for the **database**.

* [vite](https://vitejs.dev/) to **leverage** modern browser features & deliver an extremely fast development experience

* [Apollo Server]() to help implement and use the *GraphQL API*

* *[queries](https://www.apollographql.com/docs/react/data/queries)* & *[mutations](https://www.apollographql.com/docs/react/data/mutations/)* for **retrieving**, **adding**, **updating**, and **deleting** data

* meets [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) criteria - runs in the browser, functions offline, and is downloadable.

* [bcrypt package](https://www.npmjs.com/package/bcrypt) to **hash passwords** and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to *securely transmit* information between parties as a **JSON object**


>The [.npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) file will set config values specific to this project, and ensures the app will deploy properly to [Heroku](https://www.heroku.com)

#

### ![user-story](./sunken-booty/branding/9.png)

<!-- <p align="center"> -->
  <!-- <img src="./sunken-booty/branding/user-story.png"/>
</p> -->

### ![concept-design](./sunken-booty/branding/10.png)

### ![booty-list](./sunken-booty/branding/11.png)

<!-- <p align="center">
  <img src="./sunken-booty/branding/booty-list.png"/>
</p> -->

### ![team](./sunken-booty/branding/treasure-team.png)

<p align="center">
  <a href="https://github.com/christiecamp"><img width="100px" src="./sunken-booty/branding/christiecamp.png"/></a>
  &#8287;&#8287;&#8287;&#8287;&#8287;
  <a href="https://github.com/EMK2473"><img width="100px" src="./sunken-booty/branding/emk2473.png"></a>
  &#8287;&#8287;&#8287;&#8287;&#8287;
  <a href="https://github.com/Sharkman478"><img width="100px" src="./sunken-booty/branding/sharkman478.png"/></a>
  &#8287;&#8287;&#8287;&#8287;&#8287;
  <a href="https://github.com/ChrisGaye"><img width="100px" src="./sunken-booty/branding/chrisgaye.png"></a>
</p>

#

### ![installation](./sunken-booty/branding/2.png)

The application is invoked using the following commands:

##### *Clone the repository in your local development enviornment*

```javascript
git clone https://https://github.com/EMK2473/pirate-project.git
```

##### *Navigate to the CLI and input:*

```javascript
npm i
```
```javascript
npm run dev
```
#

### ![usage](./sunken-booty/branding/3.png)

**INSTRUCTIONS:**

1. Open the Integrated Terminal and follow the [installation](#installation) guidelines.

2. Interact with `WRECK'D TREASURE` through your local enviorment, or open the [application]() deployed on [Heroku](https://heroku.com/home).

3. Signup by providing an email address & creating a username/password.

4. **Search for shipwrecks**.

5. *View*, *save*, & *delete* your selected shipwrecks in your **DASHBOARD**.

6. *Logout* to leave application.


##### view [demo videos](#demo) for further help


### ![screenshot](./sunken-booty/branding/12.png)

##### *screenshot demonstrates `WRECK'D TREASURE's` back end, testing all routes with **ApolloGQL**, and the functional application deployed on **Heroku***

<!-- <p align="center">
<img src="./sunken-booty/demo/ss.png"/>
</p> -->

### ![demo](./sunken-booty/branding/13.png)

#


### ![testing](./sunken-booty/branding/8.png)

#


### ![sources](./sunken-booty/branding/4.png)

Here's a list of technologies used:

1. [Node.js](https://nodejs.org/en) - an open-source, cross-platform JavaScript runtime environment.

2. [Express.js](<(https://expressjs.com)>) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

3. [Apollo Server](https://webpack.js.org/) - an open-source, spec-compliant **GraphQL server** that's compatible with any **GraphQL client**, including [Apollo Client](). Works in conjunction with [apollo-server-express](https://www.npmjs.com/package/apollo-server-express), an *Express integration* of Apollo Server.

4. [Apollo Client](https://www.npmjs.com/package/@apollo/client) - a fully-featured caching GraphQL client with integrations for `React`, `Angular` - easily build UI components that fetch data via **GraphQL**.

4. [GraphQL](https://graphql.org/) - an open source *query language* that describes how a client should request information through an API.

5. [MongoDB](https://www.mongodb.com/) - a *NoSQL* database product that utilizes **JSON**-like documents with optional schemas.

6. [Mongoose](https://mongoosejs.com/) - a Node.j based **Object Data Modeling** *(ODM) library* for MongoDB.

7. [React](https://react.dev/) - open-source **JavaScript UI development library** for building user interfaces based on *components*. It is used with:
      * [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
      * [react-dom](https://legacy.reactjs.org/docs/react-dom.html)
      * [react-router-dom](https://www.npmjs.com/package/react-router-dom)
      * [@types/react](https://www.npmjs.com/package/@types/react)
      * [@types/react-dom](https://www.npmjs.com/package/@types/react-dom)

8. [eslint](https://eslint.org/) - a *static code analysis tool* for identifying problematic patterns found in JavaScript code. It is used with:
    * [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
    * [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
    * [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)

9. [Vite](https://vitejs.dev/guide/) -  a build tool that aims to provide a faster and leaner development experience for modern web projects.

10. [brypt](https://www.npmjs.com/package/bcrypt) -  a password hashing algorithm.

11. [jsonwebtoken]() - an implementation of [JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519).

12. [jwt-decode](https://www.npmjs.com/package/jwt-decode) - decode, sign/resign or verify **JSON Web Tokens**.

13. [Dotenv](https://www.npmjs.com/package/dotenv) - a zero-dependency module that loads environment variables from a .env file into `process.env`.

14. [Concurrently](https://www.npmjs.com/package/concurrently) - a Node.js tool that runs multiple commands concurrently.

15. [Nodemon](https://www.npmjs.com/package/nodemon) - a Node.js tool that helps develop applications by automatically restarting the node application when file changes in the directory are detected.

16. [Heroku](https://heroku.com) - used to deploy, manage, and scale the application.


### ![license](./sunken-booty/branding/5.png)

##### [mit license](./LICENSE)

### ![links](./sunken-booty/branding/6.png)

##### [*github repo*](https://github.com/EMK2473/pirate-project)

##### [*deployed app*]()
##### [*app presentation*]()

### ![connect](./sunken-booty/branding/7.png)

[![Github Badge](https://img.shields.io/badge/wreck'dtreasure-gold.svg?&logo=Github&logoColor=white)](https://github.com/EMK2473/pirate-project)

