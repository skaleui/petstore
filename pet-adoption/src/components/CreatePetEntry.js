import React, {useState} from 'react';

//mui
import {
  Typography,
  TextField,
  Box,
  Button,
  Paper
} from '@mui/material';

import {Add} from '@mui/icons-material';

//custom
import BottomNav from './BottomNav';
import { usePetContext } from '../contexts/PetContext';
export default function CreatePetEntry() {
   //input
   const [name, setName] = useState("");
   const [animal, setAnimal] = useState("");
   const [breed, setBreed] = useState("");
   const [age, setAge] = useState("");
   const [location, setLocation] = useState("");
   const [sex, setSex] = useState("");
 
   const { createNewPet } = usePetContext();
   const data = JSON.stringify({
     "data": {
       "name": name,
       "animal": animal,
       "breed": breed,
       "age": age,
       "location": location,
       "sex": sex
     }
   });
 
   const handleCreateNewPet = ()=> {
     createNewPet(data);
   };

   return (
    <Box
      component="from"
      sx={{
        '& Multifield-root': {m:1, width: '50ch'},
        display: 'flex',
        flexDirectio: 'column'
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Typography variant="h3" gutterBottom component="div">
          Edit Pet Entry
        </Typography>
        <TextField 
          required
          id="filled-name"
          label="Name"
          variant="outlined"
          onChange={(e)=>setName(e.target.value)}
        />
        <TextField
          required
          id="filled-animal"
          label="Animal"
          variant="outlined"
          helperText="Cat, Dog, Bird"
          onChange={(e)=>setAnimal(e.target.value)}
        />
        <TextField
          required
          id="filled-breed-input"
          label="Breed"
          variant="outlined"
          onChange={(e)=>setBreed(e.target.value)}
        />
       <TextField 
          required
          id="filled-location-input"
          label="Location"
          variant="outlined"
          onChange={(e)=>setLocation(e.target.value)}
        />
       <TextField 
          required
          id="filled-age"
          label="Age"
          variant="outlined"
          type="number"
          onChange={(e)=>setAge(e.target.value)}
        />       
       <TextField 
          required
          id="sex"
          label="Sex"
          variant="outlined"
          helperText="Male, Female"
          onChange={(e)=>setSex(e.target.value)}
        />       
      </div>
      <div>
        <Button onClick={handleCreateNewPet} variant="outlined" startIcon={<Add />}>
          Add Pet Entry
        </Button>
      </div>
      <Paper sx={{position: "fixed", bottom: 0, left: 0, right: 0}} elevation={3}>
        <BottomNav />
      </Paper>      
    </Box>
   )
}