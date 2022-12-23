import { gql } from '@apollo/client';

const GET_PETS = gql`
query getpets
{
  pets {
    data {
    	id
      attributes {
        name
        animal
        breed
        location
        age
        sex
      }
    }
  }
}
`;

export { 
  GET_PETS
};