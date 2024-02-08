import { gql } from '@apollo/client';

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
