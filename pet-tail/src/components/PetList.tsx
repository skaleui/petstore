import React, {useMemo} from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { usePetContext } from '../contexts/PetContext';
import PetType from '../types/Pet';

import TanTable from './TanTable';
import SelectionCheckBox from './SelectionCheckBox';


export default function PetList() {

  const { pets, setCheckedPets } = usePetContext();

  const columns = useMemo<ColumnDef<PetType>[]>(()=>[
    {
      id: 'select',
      header: "",
      cell: ({ row }) => (
        <div className="px-1">
          <SelectionCheckBox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      header: 'Sr No',
      cell: info => info.row.index+1, 
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: info => info.getValue(),
    },
    {
      header: 'Animal',
      accessorKey: 'animal',
      cell: (row)=> row.renderValue(),
    },
    {
      header: 'Breed',
      accessorKey: 'breed',
      cell: (row)=> row.renderValue(),
    },
    {
      header: 'Location',
      accessorKey: 'location',
      cell: (row)=> row.renderValue(),
    },
    {
      header: 'Age',
      accessorKey: 'age',
      cell: (row)=> row.renderValue(),
    },
    {
      header: 'Sex',
      accessorKey: 'sex',
      cell: (row)=> row.renderValue(),
    }
  ], []);


  console.log('pets list', pets);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="min-w-full px-4 sm:px-6 lg:px-8">
        <div className="mt-2">
          { pets && pets.length > 0 ? 
              <TanTable columns={columns} data={pets} setSelection={setCheckedPets}/>
              : <div> Retrieving data </div>
          }
        </div>
      </main>

    </div>
  )

}