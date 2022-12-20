import * as React from 'react';

import { BottomNavigation } from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import {
  PetsOutlined,
  AddCircleOutline,
} from '@mui/icons-material';

import { usePetContext } from '../contexts/PetContext';

const LabelBottomNavigation = ()=> {
  const { nav_value, changeNavValue } = usePetContext();
  const handleChange = (event, newValue) => {
    changeNavValue(newValue);
  };

  return (
    <BottomNavigation showLabels value={nav_value} onChange={handleChange}>
      <BottomNavigationAction
        label="Pets"
        value="PetList"
        icon={<PetsOutlined />}
      />
      <BottomNavigationAction
        label="Add Pet"
        value="AddPet"
        icon={<AddCircleOutline />}
      />
    </BottomNavigation>
  );
};

export default LabelBottomNavigation;