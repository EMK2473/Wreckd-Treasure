import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Include:
// ADD_USER
// template tag gql` `
// define: mutation($value1: valueType, $value2: valueType)
// call: mutation(key: $value1, key2: $value2 )
// requesting fields/nested object queries
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        shipWreckCount
        savedShipWrecks {
          authors
          shipWreckId
          image
          link
          title
          description
        }
      }
    }
  }
`;
// SAVE_SHIPWRECK
// template tag gql` `
// define: mutation($value1: valueType, $value2: valueType)
// call: mutation(key: $value1, key2: $value2 )
// export const SAVE_SHIPWRECK = gql`
// mutation saveShipWreck()
// `
export const SAVE_SHIPWRECK = gql`
  mutation saveShipWreck($newShipWreck: InputShipWreck!) {
    saveShipWreck(newShipWreck: $newShipWreck) {
      _id
      username
      email
      savedShipWrecks {
        shipWreckId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// template tag gql` `
// define: mutation($value: valueType, $value2: valueType)
// call: mutation(key: $value, key2: $value2 )
// REMOVE_SHIPWRECK

export const REMOVE_SHIPWRECK = gql`
  mutation removeShipWreck($shipWreckId: ID!) {
    removeShipWreck(shipWreckId: $shipWreckId) {
      _id
      username
      email
      savedShipWrecks {
        shipWreckId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// new SEARCH_SHIPWRECKS query
export const SEARCH_SHIPWRECKS = gql`
  query searchShipWrecks($searchTerm: String!) {
    searchShipWrecks(searchTerm: $searchTerm) {
      id
      volumeInfo {
        authors
        title
        description
        imageLinks {
          thumbnail
        }
      }
    }
  }
`;