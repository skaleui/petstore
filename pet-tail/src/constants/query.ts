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

const ADD_PET = gql`
mutation addpet($data: PetInput!)
{
  createPet(data: $data) {
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

const UPDATE_PET = gql`
mutation updatepet($pid: ID!, $updateData: PetInput!)
{
  updatePet(id: $pid, data: $updateData) {
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

const DELETE_PET = gql`
mutation deletepet($pid: ID!)
{
  deletePet(id: $pid) {
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
  GET_PETS,
  ADD_PET,
  UPDATE_PET,
  DELETE_PET
};