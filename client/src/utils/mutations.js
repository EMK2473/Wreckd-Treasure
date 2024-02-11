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
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedShipWrecks {
        name
        shipWreckId
        image
        coordinates{
          lat
          lng
        }
        reasonForSinking
        yearSunk
        casualties
        country
        bodyOfWater
        rarity
        treasure
      }
    }
  }
}
`;

export const BOOK_TOUR = gql`
mutation BookTour($tourName: String, $shipwrecks: [InputTour]) {
  bookTour(tourName: $tourName, shipwrecks: $shipwrecks) {
    _id
    username
    email
    bookedTours {
      tourName
      shipwrecks {
        name
        coordinates{
          lat
          lng
        }
        reasonForSinking
        yearSunk
        casualties
        country
        bodyOfWater
        treasure
        rarity
        image
      }
    }
  }
}
`;



// TODO rework to tours
export const SAVE_SHIPWRECK = gql`
mutation SaveShipWreck($newShipWreck: InputShipWreck!) {
  saveShipWreck(newShipWreck: $newShipWreck) {
    savedShipWrecks {
      name
      shipWreckId
      image
      coordinates{
          lat
          lng
        }
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


// TODO rework to tours
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

