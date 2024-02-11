import { gql } from '@apollo/client';


// rework with tours
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
