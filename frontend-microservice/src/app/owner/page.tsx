'use client';
import React, { useEffect, useRef, useState } from 'react';
import Home from '../page'; // Adjust the import path according to your file structure
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { fetchOwners, deleteOwner, searchOwner } from '@/lib/features/owner/ownerSlice';
import Link from 'next/link';

export default function OwnerManagement() {
  const dispatch = useAppDispatch();
  let owners = useAppSelector(state => state.owner.value);
  const [searchInput, setSearchInput] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(fetchOwners());
  }, [dispatch]);

  // Debounced search function
  const handleSearch = (value: string) => {
    clearTimeout(debounceTimeout.current!);
    debounceTimeout.current = setTimeout(() => {
      // Perform search logic here, for now, let's log the search value
      // console.log("Performing search for:", value);
      // Replace console.log with actual search logic, e.g., dispatch fetchOwners with search param
      dispatch(searchOwner(value));;
    }, 500); // Adjust debounce delay as needed (e.g., 500ms)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
    if (value === '') {
      dispatch(fetchOwners()); // Fetch all owners when search input is empty
    } else {
      handleSearch(value); // Perform search otherwise
    }
  };
  return (
    <Home>
      <div className='container mx-auto mt-2'>
        <div className="overflow-x-auto">
          <div className='flex items-center justify-between'>
            <Link href="/owner/add">
              <button className="btn btn-info">
                Add Owner
              </button>
            </Link>

            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" value={searchInput}
                onChange={handleChange} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Code</th>
                <th colSpan={2} className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {owners.map(owner => (
                <tr key={owner.id}>
                  <th>{owner.id}</th>
                  <td>{owner.ownerName}</td>
                  <td>{owner.ownerDesc}</td>
                  <td>{owner.ownerCode}</td>
                  <td>
                    <Link href={`/owner/${owner.id}/edit`}>
                      <button className="btn btn-warning float-end">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-error" onClick={() => {
                      if (window.confirm("Are you sure you want to delete this item with ID: " + owner.id)) {
                        dispatch(deleteOwner(owner.id))
                      }
                    }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Home>
  );
}