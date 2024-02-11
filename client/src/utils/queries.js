import { gql } from '@apollo/client';


// rework with tours
export const GET_ME = gql`
 query Query {
  me {
    _id
    username
    email
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
