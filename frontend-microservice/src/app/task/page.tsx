'use client';
import React, { useEffect, useRef, useState } from 'react';
import Home from '../page'; // Adjust the import path according to your file structure
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { fetchTaskes, deleteTask, searchTask } from '@/lib/features/task/taskSlice';
import Link from 'next/link';

export default function TaskManagement() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.task.value);
    const [searchInput, setSearchInput] = useState('');
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        dispatch(fetchTaskes());
    }, [dispatch]);

    // // Debounced search function
    const handleSearch = (value: string) => {
        clearTimeout(debounceTimeout.current!);
        debounceTimeout.current = setTimeout(() => {
            // Perform search logic here, for now, let's log the search value
            // console.log("Performing search for:", value);
            // Replace console.log with actual search logic, e.g., dispatch fetchOwners with search param
            dispatch(searchTask(value));;
        }, 500); // Adjust debounce delay as needed (e.g., 500ms)
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchInput(value);
        if (value === '') {
            dispatch(fetchTaskes()); // Fetch all owners when search input is empty
        } else {
            handleSearch(value); // Perform search otherwise
        }
    };
    return (
        <Home>
            <div className='container mx-auto mt-2'>
                <div className="overflow-x-auto">
                    <div className='flex items-center justify-between'>
                        <Link href="/task/add">
                            <button className="btn btn-info">
                                Add Task
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
                                <th>Task Name</th>
                                <th>Owner Code</th>
                                <th colSpan={3} className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows */}
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <th>{task.id}</th>
                                    <td>{task.taskName}</td>
                                    <td>{task.ownerCode}</td>
                                    <td className=''>
                                        <Link href={`/task/${task.id}`}>
                                            <button className="btn btn-success w-24 float-end">
                                                Show
                                            </button>
                                        </Link>
                                    </td>
                                    <td className='text-center w-3'>
                                        <Link href={`/task/${task.id}/edit`}>
                                            <button className="btn btn-warning">
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                    <td className=''>
                                        <button className="btn btn-error w-24 float-start" onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this item with ID: " + task.id)) {
                                                dispatch(deleteTask(task.id));
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