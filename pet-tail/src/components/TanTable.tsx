import React, { useEffect, useState } from 'react';

import {
  useReactTable, 
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,  
} from '@tanstack/react-table';

import type { ColumnDef } from '@tanstack/react-table';


interface TanTableProps<T extends object>{
  data: T[],
  columns: ColumnDef<T>[],
  setSelection?: ([]:any)=> void,
}


const TanTable = <T extends object>({columns, data, setSelection}: TanTableProps<T>) => {

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableMultiRowSelection: true,
  });

  useEffect(()=> {
    setSelection?.(table.getSelectedRowModel().flatRows);
    console.log('rowselection', rowSelection);
    // console.log('selection -> ', table.getSelectedRowModel().flatRows[0]?.original);
  }, [rowSelection, table, setSelection]);

  useEffect(()=> {
    console.log('rowselection', rowSelection);
    table.resetRowSelection();    
  }, [data])

  return (
    <div className="shadow overflow-hidden border-1 border-gray-200 min-w-full sm:rounded-lg">
      <table className="table-auto border-collapse min-w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup =>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header=>(
                <th 
                  className="border"
                  key={header.id}
                >
                  {
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td 
                  className="text-center border-2 border-blue"
                  key={cell.id}
                >
                  {
                    flexRender(
                      cell.column.columnDef.cell, 
                      cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='h-2' />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        {Object.keys(rowSelection)}
      </div>
    </div>
  )

}

export default TanTable;