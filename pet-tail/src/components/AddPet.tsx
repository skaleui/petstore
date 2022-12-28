import React, { useState, useEffect } from 'react';
import { unstable_batchedUpdates } from "react-dom";

import { Modal } from './Modal';
import { usePetContext } from '../contexts/PetContext'

const PetModal: React.FC<({showOpen?: boolean, addAction?: string, modal: typeof Modal})> = ({showOpen, addAction, modal})=> {

  const [id, setId] = useState<string | ''>("");
  const [name, setName] = useState<string | ''>("");
  const [animal, setAnimal] = useState<string | ''>("");
  const [breed, setBreed] = useState<string | ''>("");
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState("");
  const [sex, setSex] = useState("");

  const { createNewPet, updatePet, deletePet, changeNavValue, setShowModal, getSelectedPet } = usePetContext();

  interface dataObject {
    "id"?: string | "",
    "name": string,
    "animal": string,
    "breed"?: string,
    "age"?: number,
    "location"?: string,
    "sex"?: string
  };

  let newobject: dataObject = {
    "id": id,
    "name": name,
    "animal": animal,
    "breed": breed,
    "age": age,
    "location": location,
    "sex": sex
  }

  const data = {
      data: {...newobject }
  }

  useEffect(()=> {

    if(addAction === 'edit' || addAction === 'del') {
      let sPet = getSelectedPet ? getSelectedPet() : [] as any;

      console.log('useEffect', sPet);
      unstable_batchedUpdates( ()=> {
        setId(sPet.id); 
        setName(sPet.name);
        setAge(sPet.age);
        setAnimal(sPet.animal);
        setBreed(sPet?.breed );
        setLocation(sPet?.location);
        setSex(sPet.sex);
      })
    }
  },[addAction])


  const handleSubmitPet = (event:any)=> {
    let petid = data.data.id;
    delete data.data.id;
    switch(addAction) {
      case "add": 
        createNewPet?.(data.data);
        break;
      case "edit": 
        updatePet?.(petid!, data.data);
        break;
      case "del":
        deletePet?.(petid!);
        break;
      default:
        break;
    }     
    setShowModal?.(false);
    changeNavValue?.('PetList');
  }

  return (
    <modal.Frame
      open = {showOpen}
      onClose={()=> { 
        setShowModal?.(false);
      }}
    >
      <modal.Head>
        { addAction === 'add' ? `Add a Pet` : addAction === 'edit' ? `Edit a Pet` : `Delete the Pet`}
      </modal.Head>
      <modal.Body>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div>
            <div className='overflow-hidden shadow sm:rounded-md'>
              <div className='bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='flex col-span-3 items-center sm:col-span-3'>
                    <span className='inline-flex items-center text-sm font-medium text-gray-700'>Name</span>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={name}
                      autoComplete='pet name'
                      className='mt-1 ml-5 block w-full flex-1 rounded-md border text-gray-600 border-gray-400 hover:border-sky-500'
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                  <div className='flex col-span-3 items-center sm:col-span-3'>
                    <span className='inline-flex items-center text-sm font-medium text-gray-700'>Animal</span>
                    <input
                      type='text'
                      name='animal'
                      id='animal'
                      value={animal}
                      autoComplete='animal'
                      className='mt-1 ml-5 block w-full flex-1 rounded-md border text-gray-600 border-gray-400 hover:border-sky-500'
                      onChange={(e)=>setAnimal(e.target.value)}/>
                  </div>
                  <div className='flex col-span-3 items-center sm:col-span-3'>
                    <span className='inline-flex items-center text-sm font-medium text-gray-700'>Breed</span>
                    <input
                      type='text'
                      name='breed'
                      id='breed'
                      value={breed}
                      autoComplete='breed'
                      className='mt-1 ml-5 block w-full flex-1 rounded-md text-gray-600 border border-gray-400 hover:border-sky-500'
                      onChange={(e)=>setBreed(e.target.value)}/>
                  </div>
                  <div className='flex col-span-3 items-center sm:col-span-3'>
                    <span className='inline-flex items-center text-sm font-medium text-gray-700'>Location</span>
                    <input
                      type='text'
                      name='locaion'
                      id='location'
                      value={location}
                      autoComplete='location'
                      className='mt-1 ml-5 block w-full flex-1 rounded-md text-gray-600 border border-gray-400 hover:border-sky-500'
                      onChange={(e)=>setLocation(e.target.value)}/>
                  </div>
                  <div className='flex col-span-3 items-center sm:col-span-3'>
                    <span className='inline-flex items-center text-sm font-medium text-gray-700'>Age</span>
                    <input
                      type='text'
                      name='age'
                      id='age'
                      value={age}
                      autoComplete='age'
                      className='mt-1 ml-5 block w-full flex-1 rounded-md text-gray-600 border border-gray-400 hover:border-sky-500'
                      onChange={(e)=>setAge(parseInt(e.target.value))}/>
                  </div>
                  <div className='flex col-span-3 items-center sm:col-span-3'>
                    <span className='inline-flex items-center text-sm font-medium text-gray-700'>Sex</span>
                    <input
                      type='text'
                      name='sex'
                      id='sex'
                      value={sex}
                      autoComplete='pet name'
                      className='mt-1 ml-5 block w-full flex-1 rounded-md text-gray-600 border border-gray-400 hover:border-sky-500'
                      onChange={(e)=>setSex(e.target.value)}/>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleSubmitPet}
                >
                  { addAction === 'del' ? `Delete` :`Save` }
                </button>
              </div>
            </div>
          </div>
        </div>
      </modal.Body>
    </modal.Frame>
  )

}

export const AddPet: React.FC<({open: boolean, add: string})> = ({open, add})=> {

  return (
    <>
     {
      open && 
        <PetModal showOpen={open} addAction={add} modal={Modal} />
     }
    </>
  )
}