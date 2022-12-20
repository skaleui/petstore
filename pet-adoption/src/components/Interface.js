import React from 'react';

import PetList from './PetList';
import CreatePetEntry from './CreatePetEntry';
import EditPetEntry from './EditPetEntry';

//context
import { usePetContext } from '../contexts/PetContext';
const Interface = ()=> {
  const { nav_value } = usePetContext();
  switch(nav_value) {
    case "PetList": 
      return <PetList />
    case "AddPet": 
      return <CreatePetEntry />
    case "EditPet": 
      return <EditPetEntry />
    default: 
      return <PetList />
  };
};

export default Interface;