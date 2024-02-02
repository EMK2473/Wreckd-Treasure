import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      shipWreckCount
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
