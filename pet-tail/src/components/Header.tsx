import  React, {useState} from 'react';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { AddPet } from './AddPet';
import { usePetContext } from '../contexts/PetContext';
import {Modal} from './Modal';
import { MessageModal } from './MessageModal';

export default function Header() {

  const [action, setAction] = useState("");
  const [showError, setShowError] = useState({open: false, title: "", message: "error"});

  const {setShowModal, showModal, getSelected} = usePetContext();

  return (
    <div className="w-full flex flex-row place-content-between space-x-4 bg-sky-200 font-sans">
      <h1><BuildingOffice2Icon className="h-16 w-16 text-blue-500"/></h1>
      <div className="self-center py-2">
        <AddPet open={showModal} add={action}/>
        <h1 className="text-center font-bold text-blue-900 text-lg px-3">Pet Store</h1>
        <div className="flex flex-row">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={()=>{
            setAction("add");
            setShowModal?.(!showModal)
          }}
        >
          Add a Pet
        </button>
        <span>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-5 rounded-full"
          onClick={()=>{ 
            let selectedPets = getSelected?.();
            console.log('selectedPets', selectedPets);
            setAction("edit");
            if(selectedPets && Object.keys(selectedPets).length === 1) {
              setShowModal?.(!showModal, selectedPets)
            } else {
              console.log('error');
              setShowError({open:true, title: "Error", message:'Select only 1 pet'});
            }
          }}
        >
          Edit Pet
        </button>
        </span>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-5 rounded-full"
          onClick={()=>{
            let selectedPets = getSelected?.();
            console.log('selectedPets', selectedPets);
            setAction("del");
            if(selectedPets && Object.keys(selectedPets).length > 0) {
              setShowModal?.(!showModal, selectedPets)
            } else {
              console.log('error');
              setShowError({open:true, title: "Error", message:'Select only 1 pet'});
            }          
          }}
        >
          Delete Pet
        </button>
        </div>
      </div>
      {
        showError.open &&
      <MessageModal open={showError.open} title = {showError.title} message={showError.message} setShow={setShowError} modal={Modal}/>
      }
      <h1 className="self-center">{new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
}</h1>

    </div>
  )
}

