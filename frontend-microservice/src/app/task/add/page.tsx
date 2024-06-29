'use client';
import React, { useEffect } from 'react';
import Home from '@/app/page';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { addTask } from '@/lib/features/task/taskSlice';
import { fetchOwners } from '@/lib/features/owner/ownerSlice';

type Inputs = {
    taskName: string
    ownerCode: string
}

export default function AddTask() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch();
    const owners = useAppSelector(state => state.owner.value);
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const newTask = {
                id: Math.floor(Math.random() * 1000),  // Assuming you generate an id on the client
                taskName: data.taskName,
                ownerCode: data.ownerCode,
                ownerDto: ''
            };
            await dispatch(addTask(newTask)).unwrap();
            reset();  // Reset the form state after successful submission
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    useEffect(() => {
        dispatch(fetchOwners());
    }, [dispatch]);

    return (
        <Home>
            <div className='container mx-auto mt-2'>
                <div className="overflow-x-auto">
                    <Link href="/task">
                        <button className="btn btn-error">
                            Back
                        </button>
                    </Link>

                    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Task Name" {...register("taskName", { required: true })} />
                        </label>
                        {errors.taskName?.type === "required" && (
                            <p className='text-red-500'>Task name is required</p>
                        )}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Owner</span>
                            </div>
                            <select className="select select-bordered" {...register("ownerCode")} defaultValue={owners[0]?.ownerCode}>
                                {owners?.map((owner) => (
                                    <option key={owner.ownerCode} value={owner.ownerCode}>
                                        {owner.ownerName}
                                    </option>
                                ))}
                            </select>

                        </label>
                        <button className="btn btn-info mt-2 float-end">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </Home>
    );
}
