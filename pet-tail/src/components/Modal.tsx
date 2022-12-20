import React from 'react';
import classNames from "classnames";


const Frame: React.FC<{open?: boolean; children: React.ReactNode, onClose: ()=> void }> = ({
  children,
  open,
  onClose
}) => {
  return (
    <div  
      className={classNames(
        "fixed inset-0 z-10 p-8 text-white bg-gray-600/90",
        `${open ? "block" : "hidden"}`
      )}
    >
        <div className='relative w-full max-w-sm mx-auto mt-8'>
          <button
            className='absolute -top-2 -right-2 flex justify-center rounded-full h-8 w-8 bg-gray-800 cursor-pointer shadow-xl'
            onClick={()=> onClose()}
            title="Bye bye"
          >
            <span className='text-2xl leading-7 select-none'>&times;</span>
          </button>
          <div className='overflow-hidden bg-gray-100 rounded shadow-xl'>{children}</div>
        </div>
    </div>
  );
};


const Head: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="block p-4 bg-sky-500">
    <h1 className="text-lg">{children}</h1>
  </div>
);

const Body: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="p-2">
    {children}
  </div>
)

export const Modal= {Frame, Head, Body };