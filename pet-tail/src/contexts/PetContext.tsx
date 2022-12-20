import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import http from "../util/http";
import PetType from '../types/Pet';

interface PetInterface {
  pets: PetType[],
  nav_value: string,
  petId: string,
  showModal: boolean,
  // selectedPets: [],
  createNewPet?: (data:string)=> void,
  updatePet?: (petId: string, data: string)=> void,
  deletePet?: (petId: string)=> void,
  changeNavValue?: (value: string)=> void,
  getPetId?: (id: string)=> void,
  setShowModal?: (show: boolean, selectedPet?: [])=> void,
  setCheckedPets?: (sPets: []) => void,
  getSelectedPet?: ()=> PetType,
  getSelected?:()=> void,
}

const defaultState = {
  pets: [], 
  nav_value:"",
  petId: "",
  showModal: false,
  // selectedPets: []
}

const PetContext = createContext<PetInterface>(defaultState);

export const usePetContext = ()=> {
  return useContext(PetContext);
}

export const PetProvider: React.FC<{children?: ReactNode}> = ({children}) => {
  const [pets, setPets] = useState([]);
  const [nav_value, set_nav_value] = useState("PetList");
  const [petId, setPetId] = useState("");
  const [showModal, setShow] = useState(false);
  const [selectedPets, setSelectedPets] = useState<any[]>([]);

  // new pet
  const createNewPet = async (data:string)=> {
    await http.post("/api/pets", data);
    getpets();
  }

  //update a pet
  const updatePet = async (petId: string, data: string)=> {
     await http.put(`api/pets/${petId}`,data);
    getpets();
  };
 

  //delete a pet
  const deletePet = async (petId: string) => {
    await http.delete(`/api/pets/${petId}`);
    getpets();
  };

  //change nav
  const changeNavValue = (value: string) => {
    set_nav_value(value);
    if(value === "PetList") {
      getpets();
    }
  };

  const getpets =  async ()=> {
    const response = await http.get("/api/pets");
    const responseArr = response.data.data.map((item: any) => { return { id:item.id, ...item.attributes } });
    // console.log('get pets nav', responseArr);
    setPets(responseArr);   
  }   

  //get pet id value
  const getPetId = (id: string) => {
    setPetId(id);
  };


  const setShowModal = (show: boolean, selectedPets?:[])=> {
    console.log('modal pet', selectedPets);
    setShow(show);
  }

  const setCheckedPets = (sPets: []) => {
    // console.log('checked pets', sPets);
    setSelectedPets(sPets);
  }

  const getSelected = ()=> selectedPets;

  const getSelectedPet = () => {
    // console.log('getSelected Pet', selectedPets[0]?.original);
     return selectedPets?.[0]?.original as PetType;
  }

  const readAllPets = useCallback(async ()=>{
    const response = await http.get("/api/pets");
    const responseArr = response.data.data.map((item: any) => { return { id:item.id, ...item.attributes } });
    // console.log('get pets', responseArr);
    setPets(responseArr);  
  },[])

  useEffect( ()=> {

    readAllPets();
  }, [readAllPets]);

  const value:PetInterface = {
    pets,
    nav_value,
    petId,
    showModal,
    createNewPet,
    updatePet,
    deletePet,
    changeNavValue,
    getPetId,
    setShowModal,
    setCheckedPets,
    getSelectedPet,
    getSelected
  };
  
  return (
    <PetContext.Provider value={value}>
      {children}
    </PetContext.Provider>
  )
};

