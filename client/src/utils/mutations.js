import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


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
          shipWreckId
          image
        }
      }
    }
  }
`;

export const SAVE_SHIPWRECK = gql`
mutation SaveShipWreck($newShipWreck: InputShipWreck!) {
  saveShipWreck(newShipWreck: $newShipWreck) {
    savedShipWrecks {
      name
      shipWreckId
      image
      coordinates
      reasonForSinking
      yearSunk
      casualties
      country
      bodyOfWater
      description
      rarity
      treasure
    }
  }
}
`;

// not used
// export const SEARCH_SHIPWRECKS = gql`
//   query searchShipWrecks($searchTerm: String!) {
//     searchShipWrecks(searchTerm: $searchTerm) {
//       id
//       volumeInfo {
//         authors
//         title
//         description
//         imageLinks {
//           thumbnail
//         }
//       }
//     }
//   }
// `;



export const REMOVE_SHIPWRECK = gql`
  mutation removeShipWreck($shipWreckId: String) {
    removeShipWreck(shipWreckId: $shipWreckId) {
      _id
      username
      email
      savedShipWrecks {
        shipWreckId
        description
        image
      }
    }
  }
`;

