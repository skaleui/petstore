import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import http from "../util/http";
import PetType from '../types/Pet';
import { GET_PETS, ADD_PET, UPDATE_PET, DELETE_PET } from "../constants/query";
import { useQuery, useMutation } from "@apollo/client";
import { client } from '../util/apolloClient'
import { pid } from "process";


interface PetInterface {
  pets: PetType[],
  nav_value: string,
  petId: string,
  showModal: boolean,
  // selectedPets: [],
  createNewPet?: (data:{})=> void,
  updatePet?: (petId: string, data: {})=> void,
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
  const createNewPet = async (petdata:{})=> {
  
    let newdata = {...petdata, publishedAt: new Date()}

    client.mutate({
      mutation: ADD_PET,
      variables: { data: newdata }
    })
    .catch((error)=>{
      console.log(error);
    })
  
  }

  //update a pet
  const updatePet = async (petId: string, data: {})=> {

    client.mutate({
      mutation: UPDATE_PET,
      variables: {pid: petId, updateData: data}
    }).catch((error) => {
      console.log(error)
    })
  };
 

  //delete a pet
  const deletePet = async (petId: string) => {
    client.mutate({
      mutation: DELETE_PET,
      variables: { pid: petId}
    }).catch((error)=>{
      console.log(error);
    })

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

 
  const { loading, error, data} = useQuery(GET_PETS);
  useEffect( ()=> {

    if(data) {
      const responseArr = data.pets.data.map((item: any) => { return { id:item.id, ...item.attributes } });
      console.log('get pets', responseArr);
      setPets(responseArr);  
    }

  }, [data]);

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

