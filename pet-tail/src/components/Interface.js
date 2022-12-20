import React from 'react';

import PetList from './PetList';
import { usePetContext } from '../contexts/PetContext';

const Interface = ()=>{

  const { nav_value } = usePetContext();

  switch(nav_value) {
    case "PetList":
      return <PetList />

    default:
      return <PetList /> 
  }
}

export default Interface;