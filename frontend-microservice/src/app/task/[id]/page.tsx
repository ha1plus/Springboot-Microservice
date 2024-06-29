'use client';
import Home from '@/app/page';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { fetchTask } from '@/lib/features/task/taskSlice';

type ShowTask = {
    id: number;
    taskName: string;
    ownerDto: string;
};

export default function ShowTask() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const task = useAppSelector(state => state.task.value[0] as ShowTask | undefined);

    useEffect(() => {
        if (id) {
            dispatch(fetchTask(parseInt(id)));
        }
    }, [dispatch, id]);

    return (
        <Home>
            <div className='container mx-auto mt-2'>
                <div className="overflow-x-auto">
                    <Link href="/task">
                        <button className="btn btn-error">
                            Back
                        </button>
                    </Link>
                    <section>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Task Name</th>
                                        <th>Owner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {task ? (
                                        <tr key={task.id}>
                                            <td>{task.taskName}</td>
                                            <td>{task.ownerDto}</td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan={2}>No task found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </Home>
    );
}
