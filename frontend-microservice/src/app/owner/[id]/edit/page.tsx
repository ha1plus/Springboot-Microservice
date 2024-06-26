'use client';
import React, { useEffect } from 'react';
import Home from '@/app/page';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { useParams } from 'next/navigation';
import { updateOwner } from '@/lib/features/owner/ownerSlice';

type Inputs = {
    ownerName: string
    ownerDesc: string
    ownerCode: string
}

export default function UpdateOwner() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();

    const owner = useAppSelector((state) =>
        state.owner.value.find(owner => owner.id === parseInt(id))
    );

    useEffect(() => {
        if (owner) {
            setValue('ownerName', owner.ownerName);
            setValue('ownerDesc', owner.ownerDesc);
            setValue('ownerCode', owner.ownerCode);
        }
    }, [owner, setValue]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const updatedOwnerData = {
                id: parseInt(id),
                ownerName: data.ownerName,
                ownerDesc: data.ownerDesc,
                ownerCode: data.ownerCode,
            };
            await dispatch(updateOwner(updatedOwnerData)).unwrap();
            // Fetch the updated owner data again
            const updatedOwner = useAppSelector((state) =>
                state.owner.value.find(owner => owner.id === parseInt(id))
            );
            // Reset the form with the updated owner data
            if (updatedOwner) {
                setValue('ownerName', updatedOwner.ownerName);
                setValue('ownerDesc', updatedOwner.ownerDesc);
                setValue('ownerCode', updatedOwner.ownerCode);
            }
        } catch (error) {
            console.error('Failed to add owner', error);
        }
    };
    return (
        <Home>
            <div className='container mx-auto mt-2'>
                <div className="overflow-x-auto">
                    <Link href="/owner">
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
                            <input type="text" className="grow" placeholder="Owner Name" {...register("ownerName", { required: true })} />
                        </label>
                        {errors.ownerName?.type === "required" && (
                            <p className='text-red-500'>Owner name is required</p>
                        )}
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Owner Description" {...register("ownerDesc", { required: true })} />
                        </label>
                        {errors.ownerDesc?.type === "required" && (
                            <p className='text-red-500'>Owner descriptionis required</p>
                        )}
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="text" className="grow" placeholder="Owner Code" {...register("ownerCode", { required: true })} />
                        </label>
                        {errors.ownerCode?.type === "required" && (
                            <p className='text-red-500'>Owner code is required</p>
                        )}
                        <button className="btn btn-info mt-2 float-end">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Home >
    );
}