import { gql } from '@apollo/client';



export const GET_ME = gql`
query Query {
  me {
    _id
    username
    email
    bookedTours {
        tourName
      shipwrecks {
        treasure
        description
        bodyOfWater
        country
        casualties
        yearSunk
        reasonForSinking
        shipWreckId
        name
        coordinates {
          lat
          lng
        }
      }
    }
  }
}
`;

export const GET_BOOKED_TOURS = gql`
query Query($userId: ID!) {
  getBookedTours(userId: $userId)
}
`