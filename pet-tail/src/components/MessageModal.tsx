import React from 'react';

import { Modal } from './Modal';

interface ModalProps<T extends object>{
  open: boolean,
  title?: string,
  message?: string,
  setShow?: ({}:any)=> void,
  modal: typeof Modal
}


export const MessageModal = <T extends object>({open, title, message, setShow, modal}: ModalProps<T>) => {  
  console.log('ErrorModal message', message);
  return (
    <>
    <modal.Frame
      open = {open}
      onClose= {()=> {
        setShow?.({open: false, message: ''})
      }}
    > 
      <modal.Head>{title ? title : 'Error' }</modal.Head>
      <modal.Body>
       <div className="mt-5 md:col-span-2 md:mt-0">
          <div>
            <div className='overflow-hidden shadow sm:rounded-md'>
              <div className='bg-white px-4 py-5 sm:p-6 text-red-600'>
                  {message}
              </div>
            </div>
           </div>
        </div>      
      </modal.Body>
    </modal.Frame>
    </>
  )
}
