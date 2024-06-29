'use client';
import React, { useEffect } from 'react';
import Home from '@/app/page';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { fetchOwners } from '@/lib/features/owner/ownerSlice';
import { updateTask } from '@/lib/features/task/taskSlice';
import { useParams } from 'next/navigation';

type Inputs = {
    taskName: string
    ownerCode: string
}

export default function EditTask() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch();
    const owners = useAppSelector(state => state.owner.value);
    const { id } = useParams<{ id: string }>();
    const task = useAppSelector((state) =>
        state.task.value.find(task => task.id === parseInt(id))
    );
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const updateTaskData = {
                id: parseInt(id),
                taskName: data.taskName,
                ownerCode: data.ownerCode,
                ownerDto: ''
            };

            // Assuming `updateTask` is a Redux thunk action creator
            await dispatch(updateTask(updateTaskData)).unwrap();

            // Optionally fetch the updated task data again if needed
            const updatedTask = useAppSelector((state) =>
                state.task.value.find(task => task.id === parseInt(id))
            );

            // Reset the form with the updated task data
            if (updatedTask) {
                setValue('taskName', updatedTask.taskName);
                setValue('ownerCode', updatedTask.ownerCode);
            }
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };


    useEffect(() => {
        dispatch(fetchOwners());
    }, [dispatch]);

    useEffect(() => {
        if (task) {
            setValue('taskName', task.taskName);
            setValue('ownerCode', task.ownerCode);
        }
    }, [task, setValue]);

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
                            <select className="select select-bordered" {...register("ownerCode")}>
                                {owners?.map((owner) => (
                                    <option key={owner.ownerCode} value={owner.ownerCode} >
                                        {owner.ownerName}
                                    </option>
                                ))}
                            </select>

                        </label>
                        <button className="btn btn-info mt-2 float-end">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Home>
    );
}
